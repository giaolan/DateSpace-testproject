// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract DataNFT is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Pausable,
    Ownable,
    ERC721Burnable
{
    // 交易记录
    struct Transaction {
        address seller;
        address buyer;
        uint256 tokenId;
        uint256 price;
        uint256 blockNumber;
    }

    // 待出售的NFT编号和价格
    struct TokenOnSale {
        uint256 tokenId;
        uint256 price;
        uint8 sellType; // 0: 出租, 1: 出售
        // 出租时长
        uint256 duration;
        uint256 blockNumber;
    }

    // NFT操作记录
    struct TokenOperation {
        address operator;
        uint8 operationType; // 1: 铸造, 2: 删除, 3: 更新, 4: 出租, 5: 出售, 6: 购买
        uint256 tokenId;
        uint256 blockNumber;
        string uri;
        string newUri;
        uint256 price;
    }

    TokenOnSale[] private _allTokensOnSale; // 存储所有出售中的NFT
    Transaction[] private _transactions; // 存储所有交易记录
    TokenOperation[] private _operations; // 存储所有操作记录

    constructor(
        address initialOwner
    ) ERC721("DataNFT", "DNFT") Ownable(initialOwner) {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // 安全铸造NFT
    function safeMint(address to, uint256 tokenId, string memory uri) public {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        // 添加到操作记录
        _operations.push(
            TokenOperation({
                operator: to,
                operationType: 1,
                tokenId: tokenId,
                blockNumber: block.number,
                uri:'',
                newUri:'',
                price:0
            })
        );
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    )
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // 获取所有NFT，仅合约拥有者可调用
    function getAllTokens() public view onlyOwner returns (uint256[] memory) {
        uint256 tokenCount = totalSupply();
        uint256[] memory result = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            result[i] = tokenByIndex(i);
        }
        return result;
    }

    // 获取特定用户所有的NFT
    function getTokensByOwner(
        address owner
    ) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory result = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            result[i] = tokenOfOwnerByIndex(owner, i);
        }
        return result;
    }

    // 删除NFT
    function deleteToken(uint256 tokenId) public {
        // 判断调用的用户是否是NFT的拥有者
        require(
            ownerOf(tokenId) == msg.sender,
            "DataNFT:CANNOT_DELETE_OTHERS_NFT"
        );
        _burn(tokenId);
        // 添加到操作记录
        _operations.push(
            TokenOperation({
                operator: msg.sender,
                operationType: 2,
                tokenId: tokenId,
                blockNumber: block.number,
                uri:'',
                newUri:'',
                price:0
            })
        );
    }

    // 更新NFT
    function updateToken(uint256 tokenId, string memory uri) public {
        // 判断调用的用户是否是NFT的拥有者
        require(
            ownerOf(tokenId) == msg.sender,
            "DataNFT:CANNOT_UPDATE_OTHERS_NFT"
        );
        string memory oldUri = tokenURI(tokenId);
        _setTokenURI(tokenId, uri);
        // 添加到操作记录
        _operations.push(
            TokenOperation({
                operator: msg.sender,
                operationType: 3,
                tokenId: tokenId,
                blockNumber: block.number,
                uri: oldUri,
                newUri: uri,
                price:0
            })
        );
    }

    // 出售NFT, type: 0: 出租, 1: 出售，如果是出租，需要指定出租时长
    function sellToken(uint256 tokenId, uint256 price,uint8 sellType,uint256 duration) public {
        require(
            ownerOf(tokenId) == msg.sender,
            "DataNFT:CANNOT_SELL_OTHERS_NFT"
        );
        // 将NFT添加到出售列表
        _allTokensOnSale.push(
            TokenOnSale({
                tokenId: tokenId,
                price: price,
                blockNumber: block.number,
                sellType: sellType,
                duration: duration
            })
        );
        // 添加到操作记录
        _operations.push(
            TokenOperation({
                operator: msg.sender,
                operationType: 4+sellType,
                tokenId: tokenId,
                blockNumber: block.number,
                uri:'',
                newUri:'',
                price:0
            })
        );
    }

    // 购买NFT
    function buyToken(uint256 tokenId) public payable {
        // 判断NFT是否在出售列表中
        bool isOnSale = false;
        uint256 index = 0;
        for (uint256 i = 0; i < _allTokensOnSale.length; i++) {
            if (_allTokensOnSale[i].tokenId == tokenId) {
                isOnSale = true;
                index = i;
                break;
            }
        }
        require(isOnSale, "DataNFT:TOKEN_NOT_ON_SALE");
        // 判断购买者是否支付了足够的ETH
        require(
            msg.value >= _allTokensOnSale[index].price,
            "DataNFT:INSUFFICIENT_ETH"
        );
        // 转移NFT所有权
        address seller = ownerOf(tokenId);
        _transfer(seller, msg.sender, tokenId);
        payable(seller).transfer(msg.value);
        // 如果为出租，在到期后自动返回原账户
        if(_allTokensOnSale[index].sellType == 0){
            uint256 duration = _allTokensOnSale[index].duration;
            // uint256 blockNumber = _allTokensOnSale[index].blockNumber;
            // if(block.number - blockNumber > duration){
            //     _transfer(msg.sender, seller, tokenId);
            // }
        }
        // 从出售列表中删除NFT
        _allTokensOnSale[index] = _allTokensOnSale[_allTokensOnSale.length - 1];
        _allTokensOnSale.pop();
        // 添加到交易记录
        _transactions.push(
            Transaction({
                seller: seller,
                buyer: msg.sender,
                tokenId: tokenId,
                price: _allTokensOnSale[index].price,
                blockNumber: block.number
            })
        );
        // 添加到操作记录
        _operations.push(
            TokenOperation({
                operator: msg.sender,
                operationType: 5,
                tokenId: tokenId,
                blockNumber: block.number,
                uri:'',
                newUri:'',
                price:0
            })
        );
    }

    // 获取所有出售中的NFT和价格
    function getAllTokensOnSale() public view returns (TokenOnSale[] memory) {
        return _allTokensOnSale;
    }

    // 获取所有交易记录
    function getAllTransactions() public view returns (Transaction[] memory) {
        return _transactions;
    }

    // 获取特定用户的交易记录
    function getTransactionsByUser(
        address user
    ) public view returns (Transaction[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < _transactions.length; i++) {
            if (
                _transactions[i].seller == user ||
                _transactions[i].buyer == user
            ) {
                count++;
            }
        }
        Transaction[] memory result = new Transaction[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < _transactions.length; i++) {
            if (
                _transactions[i].seller == user ||
                _transactions[i].buyer == user
            ) {
                result[index] = _transactions[i];
                index++;
            }
        }
        return result;
    }

    // 获取指定NFT的交易记录
    function getTransactionsByToken(
        uint256 tokenId
    ) public view returns (Transaction[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < _transactions.length; i++) {
            if (_transactions[i].tokenId == tokenId) {
                count++;
            }
        }
        Transaction[] memory result = new Transaction[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < _transactions.length; i++) {
            if (_transactions[i].tokenId == tokenId) {
                result[index] = _transactions[i];
                index++;
            }
        }
        return result;
    }

    // 获取所有操作记录
    function getAllOperations()
        public
        view
        onlyOwner
        returns (TokenOperation[] memory)
    {
        return _operations;
    }

    // 获取特定用户的操作记录
    function getOperationsByUser(
        address user
    ) public view onlyOwner returns (TokenOperation[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < _operations.length; i++) {
            if (_operations[i].operator == user) {
                count++;
            }
        }
        TokenOperation[] memory result = new TokenOperation[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < _operations.length; i++) {
            if (_operations[i].operator == user) {
                result[index] = _operations[i];
                index++;
            }
        }
        return result;
    }

    // 获取指定NFT的操作记录
    function getOperationsByToken(
        uint256 tokenId
    ) public view onlyOwner returns (TokenOperation[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < _operations.length; i++) {
            if (_operations[i].tokenId == tokenId) {
                count++;
            }
        }
        TokenOperation[] memory result = new TokenOperation[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < _operations.length; i++) {
            if (_operations[i].tokenId == tokenId) {
                result[index] = _operations[i];
                index++;
            }
        }
        return result;
    }
}

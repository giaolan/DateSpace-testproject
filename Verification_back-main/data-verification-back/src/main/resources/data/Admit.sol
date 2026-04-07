// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

contract Admit {
    struct Admit {
        address admiter;
        uint256 score;
        uint256 blockNumber; // 选取时的区块号
        uint256 admitBlockNumber; // 打分时的区块号
    }
    mapping(address => Admit[5]) private _admit; // 审核记录
    address[] private _key; // 所有key
    address[] private _admiters; // 所有审核人
    address[] private _users; // 所有用户

    // 选取审核人
    function selectAdmiter(address user) public returns (address[] memory) {
        require(!isAdmited(user), "Admit: have been admited");
        Admit[] memory admit = new Admit[](5);
        address[] memory admiters = new address[](5);
        // 从_admiters中随机选取5个不重复的审核人
        for (uint256 i = 0; i < 5; i++) {
            uint256 index = uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, block.difficulty, i)
                )
            ) % _admiters.length;
            // 选取的审核人不能重复
            for (uint256 j = 0; j < i; j++) {
                if (admiters[j] == _admiters[index]) {
                    index = (index + 1) % _admiters.length;
                    j = 0;
                }
            }
            admit[i].admiter = _admiters[index];
            admit[i].blockNumber = block.number;
            _admit[user][i] = admit[i];
        }
        _key.push(user);
        return admiters;
    }

    // 查看审核人是否存在
    function isAdmiter(address admiter) public view returns (bool) {
        for (uint256 i = 0; i < _admiters.length; i++) {
            if (_admiters[i] == admiter) {
                return true;
            }
        }
        return false;
    }

    // 查看用户是否通过审核
    function isAdmited(address user) public view returns (bool) {
        for (uint256 i = 0; i < _users.length; i++) {
            if (_users[i] == user) {
                return true;
            }
        }
        return false;
    }

    // 审核人打分
    function admit(address user, uint256 score) public {
        require(score >= 0 && score <= 100, "Admit: score out of range");
        require(isAdmiter(msg.sender), "Admit: not an admiter");
        // 查看是否是user的审核人
        bool isAdmiter = false;
        uint256 index = 0;
        for (uint256 i = 0; i < 5; i++) {
            if (_admit[user][i].admiter == msg.sender) {
                isAdmiter = true;
                index = i;
                break;
            }
        }
        require(isAdmiter, "Admit: not admiter");
        require(!isAdmited(user), "Admit: have been admited");
        Admit memory admit = _admit[user][index];
        admit.score = score;
        admit.admitBlockNumber = block.number;
        _admit[user][index] = admit;
        // 如果60分以上>=3个审核人，用户通过审核
        uint256 count = 0;
        for (uint256 i = 0; i < 5; i++) {
            if (_admit[user][i].score >= 60) {
                count++;
            }
        }

        if (count >= 3) {
            _users.push(user);
        }
    }

    // 查看所有审核记录
    function getAdmits()
        public
        view
        returns (Admit[5][] memory, address[] memory)
    {
        Admit[5][] memory admits = new Admit[5][](_users.length);
        for (uint256 i = 0; i < _users.length; i++) {
            admits[i] = _admit[_users[i]];
        }
        return (admits, _key);
    }

    // 查看用户审核记录
    function getAdmit(address user) public view returns (Admit[5] memory) {
        return _admit[user];
    }

    // 查看审核人
    function getAdmiters() public view returns (address[] memory) {
        return _admiters;
    }

    // 查看用户
    function getUsers() public view returns (address[] memory) {
        return _users;
    }

    // 添加审核人
    function addAdmiter(address admiter) public {
        _admiters.push(admiter);
    }

    // 删除审核人
    function removeAdmiter(address admiter) public {
        for (uint256 i = 0; i < _admiters.length; i++) {
            if (_admiters[i] == admiter) {
                _admiters[i] = _admiters[_admiters.length - 1];
                _admiters.pop();
                break;
            }
        }
    }

    // 删除用户
    function removeUser(address user) public {
        for (uint256 i = 0; i < _users.length; i++) {
            if (_users[i] == user) {
                _users[i] = _users[_users.length - 1];
                _users.pop();
                break;
            }
        }
    }

    // 查看审核人数量
    function admiterCount() public view returns (uint256) {
        return _admiters.length;
    }

    // 查看用户数量
    function userCount() public view returns (uint256) {
        return _users.length;
    }
}

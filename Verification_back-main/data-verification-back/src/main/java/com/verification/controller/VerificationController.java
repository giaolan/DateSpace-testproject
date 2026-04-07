package com.verification.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.verification.domain.*;
import com.verification.service.TokenService;
import com.verification.service.TokenhistoryService;
import com.verification.service.UploaddataService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

// 可信层级确权模块控制器
@Api(tags = "可信层级确权模块")
@RestController
@Slf4j
public class VerificationController {
    @Autowired
    private TokenService tokenService;

    @Autowired
    private TokenhistoryService tokenhistoryService;

    @Autowired
    private UploaddataService uploaddataService;

    @ApiOperation(value = "插入代币", notes = "如果类型为NFT，需要传入数据id；如果类型为SBT，则需要传入NFT的id，如果指定SBT，还需要传入SBT的id")
    @PostMapping("/insertToken")
    public String insertToken(@RequestParam Long userId,@RequestParam(required = false) Long dataId, @RequestParam String type,@RequestParam(required = false) Long NFT,@RequestParam(required = false) Long SBT,@RequestParam(required = false) String detail,@RequestParam(required = false) String keyword){
        // 如果是SBT
        if(type.equals("SBT")&&NFT!=null) {
            // 查找NFT
            Token NFTToken = tokenService.getById(NFT);
            if(NFTToken==null) {
                return "NFT不存在";
            }
            // 如果include不为空，说明已经有SBT，不能再指定
            if(NFTToken.getInclude()!=null) {
                Tokenhistory SBTTokenhistory = new Tokenhistory();
                SBTTokenhistory.setUserid(NFTToken.getUserid());
                SBTTokenhistory.setTime(new Date());
                SBTTokenhistory.setMsg("NFT已经绑定");
                SBTTokenhistory.setIssuccess(0);
                SBTTokenhistory.setType("SBT");
                SBTTokenhistory.setIsupdate(0);
                tokenhistoryService.save(SBTTokenhistory);
                return "NFT已经绑定";
            }
            // 如果指定SBT
            if(SBT!=null) {
                Token SBTToken = tokenService.getById(SBT);
                if(SBTToken==null) {
                    return "SBT不存在";
                }
                if(SBTToken.getType().equals("NFT")) {
                    Tokenhistory SBTTokenhistory = new Tokenhistory();
                    SBTTokenhistory.setUserid(SBTToken.getUserid());
                    SBTTokenhistory.setTime(new Date());
                    SBTTokenhistory.setMsg("不可申请绑定在NFT下");
                    SBTTokenhistory.setIssuccess(0);
                    SBTTokenhistory.setType("SBT");
                    SBTTokenhistory.setIsupdate(0);
                    tokenhistoryService.save(SBTTokenhistory);
                    return "不可申请绑定在NFT下";
                }
                // 设置NFT的include为SBT的id
                NFTToken.setInclude(SBT);
                Tokenhistory tokenhistory = new Tokenhistory();
                tokenhistory.setUserid(NFTToken.getUserid());
                tokenhistory.setTime(new Date());
                tokenhistory.setIssuccess(1);
                tokenhistory.setType("NFT");
                tokenhistory.setIsupdate(1);
                tokenhistory.setTokenid(SBT);
                tokenhistoryService.save(tokenhistory);
            }
            else{
                // 如果不指定SBT，则创建一个SBT
                Token token = new Token();
                token.setUserid(userId);
                token.setType(type);
                token.setKeyword(keyword);
                token.setDetail(detail);
                token.setCreatetime(new Date());
                Tokenhistory tokenhistory = new Tokenhistory();
                tokenhistory.setUserid(userId);
                tokenhistory.setTime(new Date());
                tokenhistory.setIssuccess(1);
                tokenhistory.setType("SBT");
                tokenhistory.setIsupdate(0);
                tokenService.save(token);
                tokenhistory.setTokenid(token.getId());
                tokenhistoryService.save(tokenhistory);

                // 设置NFT的include为新创建SBT的id
                NFTToken.setInclude(token.getId());
            }
            return tokenService.updateById(NFTToken)?"success":"fail";
        }
        // 如果是NFT
        else if(type.equals("NFT")) {
            // 判断数据是否已经被确权
            QueryWrapper<Uploaddata> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("id", dataId);
            Uploaddata uploaddata = uploaddataService.getOne(queryWrapper);
            if(uploaddata==null) {
                return "数据不存在";
            }
            QueryWrapper<Token> queryWrapper1 = new QueryWrapper<>();
            queryWrapper1.eq("dataId", dataId);
            if(tokenService.getOne(queryWrapper1)!=null) {
                return "数据已经被确权";
            }
            Token token = new Token();
            token.setUserid(userId);
            token.setType(type);
            token.setKeyword(keyword);
            token.setDetail(detail);
            token.setCreatetime(new Date());
            token.setDataid(dataId);
            Tokenhistory tokenhistory = new Tokenhistory();
            tokenhistory.setUserid(userId);
            tokenhistory.setTime(new Date());
            tokenhistory.setIssuccess(1);
            tokenhistory.setType("NFT");
            tokenhistory.setIsupdate(0);
            tokenService.save(token);
            tokenhistory.setTokenid(token.getId());
            tokenhistoryService.save(tokenhistory);
            return "success";
        }
        return "fail";
    }

    @ApiOperation(value = "获取代币", notes = "将所属NFT放到SBT下")
    @GetMapping("/getObjToken")
    public List<ObjToken> getObjToken(@RequestParam String userId) {
        QueryWrapper<Token> queryWrapper = new QueryWrapper<>();
        // 获取所有NFT
        queryWrapper.eq("userId", userId);
        queryWrapper.eq("type", "NFT");
        List<Token> NFTs = tokenService.list(queryWrapper);
        // 获取所有SBT
        QueryWrapper<Token> SBTQueryWrapper = new QueryWrapper<>();
        SBTQueryWrapper.eq("userId", userId);
        SBTQueryWrapper.eq("type", "SBT");
        List<Token> SBTs = tokenService.list(SBTQueryWrapper);
        List<ObjToken> tokens = new ArrayList<>(); // 代币列表
        // 将NFT和SBT转换为ObjToken
        for(Token SBT : SBTs) {
            ObjToken objToken = new ObjToken();
            BeanUtils.copyProperties(SBT, objToken);
            tokens.add(objToken);
        }
        for (Token NFT : NFTs) {
            // 如果NFT不属于某个SBT，则直接加入到tokens中
            if(NFT.getInclude()==null) {
                ObjToken objToken = new ObjToken();
                BeanUtils.copyProperties(NFT, objToken);
                tokens.add(objToken);
            }
            else{
                for (ObjToken token : tokens) {
                    if (token.getId().equals(NFT.getInclude())) {
                        // 如果SBT还未添加NFT，新建列表再添加
                        if (token.getNFT() == null) {
                            List<Token> NFTList = new ArrayList<>();
                            NFTList.add(NFT);
                            System.out.println(NFTList);
                            token.setNFT(NFTList);
                        } else {
                            List<Token> list = token.getNFT();
                            list.add(NFT);
                            token.setNFT(list);
                        }
                        break;
                    }
                }
            }
        }
        return tokens;
    }

    @ApiOperation(value = "获取代币", notes = "将所有代币列表展示")
    @GetMapping("/getListTokens")
    public List<Token> getTokens(@RequestParam String userId) {
        QueryWrapper<Token> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId", userId);
        return tokenService.list(queryWrapper);
    }

    @ApiOperation("获取所有未绑定NFT")
    @GetMapping("/getNFTs")
    public List<Token> getNFTs(@RequestParam String userId) {
        QueryWrapper<Token> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId", userId);
        queryWrapper.eq("type", "NFT");
        queryWrapper.isNull("include");
        return tokenService.list(queryWrapper);
    }

    @ApiOperation("获取所有SBT")
    @GetMapping("/getSBTs")
    public List<Token> getSBTs(@RequestParam String userId) {
        QueryWrapper<Token> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId", userId);
        queryWrapper.eq("type", "SBT");
        return tokenService.list(queryWrapper);
    }

    @ApiOperation("获取申请代币历史")
    @GetMapping("/getTokenHistory")
    public List<Tokenhistory> getTokenHistory(@RequestParam String userId) {
        QueryWrapper<Tokenhistory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userid", userId);
        queryWrapper.eq("isUpdate", 0);
        return tokenhistoryService.list(queryWrapper);
    }

    @ApiOperation("获取NFT代币数")
    @GetMapping("/getNFTCount")
    public int getNFTCount(@RequestParam String userId) {
        QueryWrapper<Token> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId", userId);
        queryWrapper.eq("type", "NFT");
        return tokenService.list(queryWrapper).size();
    }

    @ApiOperation("获取SBT代币数")
    @GetMapping("/getSBTCount")
    public int getSBTCount(@RequestParam String userId) {
        QueryWrapper<Token> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId", userId);
        queryWrapper.eq("type", "SBT");
        return tokenService.list(queryWrapper).size();
    }

    @ApiOperation("获取NFT申请成功率")
    @GetMapping("/getNFTSuccessRate")
    public double getNFTSuccessRate(@RequestParam String userId) {
        QueryWrapper<Tokenhistory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId", userId);
        queryWrapper.eq("type", "NFT");
        queryWrapper.eq("isSuccess", 1);
        int successCount = tokenhistoryService.list(queryWrapper).size();
        QueryWrapper<Tokenhistory> fail = new QueryWrapper<>();
        fail.eq("userId", userId);
        fail.eq("type", "NFT");
        fail.eq("isSuccess", 0);
        int failCount = tokenhistoryService.list(fail).size();
        return (double)successCount/(successCount+failCount);
    }

    @ApiOperation("获取SBT申请成功率")
    @GetMapping("/getSBTSuccessRate")
    public double getSBTSuccessRate(@RequestParam String userId) {
        QueryWrapper<Tokenhistory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("userId", userId);
        queryWrapper.eq("type", "SBT");
        queryWrapper.eq("isSuccess", 1);
        int successCount = tokenhistoryService.list(queryWrapper).size();
        QueryWrapper<Tokenhistory> fail = new QueryWrapper<>();
        fail.eq("userId", userId);
        fail.eq("type", "SBT");
        fail.eq("isSuccess", 0);
        int failCount = tokenhistoryService.list(fail).size();
        return (double)successCount/(successCount+failCount);
    }

    @ApiOperation("获取代币详情")
    @GetMapping("/getTokenDetail")
    public DataOverview getDetail(@RequestParam Long tokenId) {
        Token token = tokenService.getById(tokenId);
        Uploaddata data = uploaddataService.getById(token.getDataid());
        DataOverview dataOverview = new DataOverview();
        dataOverview.setId(token.getId());
        dataOverview.setFormat(data.getType());
        dataOverview.setDataType(data.getDatatype());
        dataOverview.setDetail(data.getDetail());
        dataOverview.setName(data.getName());
        dataOverview.setSize(data.getSize());
        dataOverview.setOwner(token.getUserid());
        dataOverview.setTokenId(token.getId());
        dataOverview.setDate(token.getCreatetime());
        return dataOverview;
    }

    @ApiOperation("获取用户其他两个代币")
    @GetMapping("/getOtherToken")
    public List<Trade> getOther(@RequestParam Long tokenId) {
        Token token = tokenService.getById(tokenId);
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("userId",token.getUserid());
        queryWrapper.eq("isRent",0);
        List list = tokenService.list(queryWrapper);
        // list删掉与tokenId相同的代币
        for (int i = 0; i < list.size(); i++) {
            Token t = (Token) list.get(i);
            if(t.getId().equals(tokenId)) {
                list.remove(i);
                break;
            }
        }
        if(list.size()>=2) {
            return list.subList(0,2);
        }
        return list;
    }
}

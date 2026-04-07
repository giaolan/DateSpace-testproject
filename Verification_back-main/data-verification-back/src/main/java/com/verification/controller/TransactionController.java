package com.verification.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.verification.domain.*;
import com.verification.service.TokenService;
import com.verification.service.TradeService;
import com.verification.service.TradehistoryService;
import com.verification.service.UploaddataService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.*;

// 数据流通模块控制器
@Api(tags = "数据流通模块")
@RestController
@Slf4j
public class TransactionController {
    @Autowired
    private TradeService tradeService;
    @Autowired
    private TradehistoryService tradehistoryService;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UploaddataService uploaddataService;

    @ApiOperation("获取交易市场列表")
    @GetMapping("/getStore")
    public List<TradeReturn> getStore() {
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("isDone",0);
        List<Trade> list = tradeService.list(queryWrapper);
        List<TradeReturn> tradeReturnList = new ArrayList<>();
        for(Trade trade : list) {
            Token token = tokenService.getById(trade.getTokenid());
            Uploaddata data = uploaddataService.getById(token.getDataid());
            TradeReturn tradeReturn = new TradeReturn(trade);
            tradeReturn.setSize(data.getSize());
            tradeReturnList.add(tradeReturn);
        }
        return tradeReturnList;
    }

    @ApiOperation("发布交易")
    @PostMapping("/publish")
    public String publish(@RequestParam Long tokenId, @RequestParam String type, @RequestParam(required = false) String keyword, @RequestParam(required = false) String detail, @RequestParam BigDecimal price) {
        Token token = tokenService.getById(tokenId);
        if (token == null) return "fail";
        // 如果代币类型为SBT，不可出售
        if(token.getType().equals("SBT")&& Objects.equals(type, "0")) {
            return "SBT不可出售";
        }
        // 如果NFT已绑定，不可出售
        if(token.getInclude()!=null&& Objects.equals(type, "0")) {
            return "该NFT已绑定，不可出售！";
        }
        // 如果代币已出租被锁定，不可出售
        if(token.getIsrent()!=0) {
            return "该代币已锁定";
        }
        // 如果代币已发布，不可重复发布
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("tokenid",tokenId);
        if(tradeService.getOne(queryWrapper)!=null) {
            return "该代币已发布";
        }
        // 发布交易
        Trade trade = new Trade();
        trade.setTokenid(tokenId);
        trade.setType(type);
        trade.setKeyword(keyword);
        trade.setDetail(detail);
        trade.setPrice(price);
        trade.setTime(new Date());
        trade.setUserid(token.getOwnerid()!=null?token.getOwnerid():token.getUserid());
        return tradeService.save(trade) ? "success" : "fail";
    }

    @ApiOperation("进行交易")
    @PostMapping("/transaction")
    public String transaction(@RequestParam Long tradeId, @RequestParam Long buyerId,@RequestParam(required = false) Long time) {
        // 更新Token表
        Trade trade = tradeService.getById(tradeId);
        if(trade.getIsdone()==1) {
            return "该数据已被交易";
        }
        Token token = tokenService.getById(trade.getTokenid());
        if (token == null) return "fail";
        // 如果交易为出租
        if (Objects.equals(trade.getType(), "1")) {
            token.setIsrent(1);
            token.setOwnerid(token.getUserid());
        }
        token.setUserid(buyerId);
        tokenService.updateById(token);
        // 修改交易为已完成
        trade.setIsdone(1);
        tradeService.updateById(trade);
        // 插入交易记录
        Tradehistory tradehistory = new Tradehistory();
        tradehistory.setTradeid(tradeId);
        tradehistory.setBuyerid(buyerId);
        tradehistory.setTime(new Date());
        tradehistory.setSellerid(token.getOwnerid() != null?token.getOwnerid():token.getUserid());
        //生成16位hash
        tradehistory.setHash("0x"+UUID.randomUUID().toString().replace("-",""));
        tradehistoryService.save(tradehistory);
        return "success";
    }

    @ApiOperation(value="获取交易记录",notes="isBuy为1时获取用户购买记录，为0时获取用户出售记录")
    @GetMapping("/getTradehistory")
    public List<TradeHistoryReturn> getTradehistory(@RequestParam int isBuy, @RequestParam Long userId) {
        QueryWrapper queryWrapper = new QueryWrapper();
        if(isBuy==1) {
            queryWrapper.eq("buyerId",userId);
        } else {
            queryWrapper.eq("sellerId",userId);
        }
        List list = tradehistoryService.list(queryWrapper);
        // 遍历list，将Tradehistory转换为TradeHistoryReturn
        List <TradeHistoryReturn> tradeHistoryReturnList = new ArrayList<>();
        for(Tradehistory tradehistory : (List<Tradehistory>)list) {
            if(tradehistory.getIsdelete() != 1) {
                TradeHistoryReturn tradeHistoryReturn = new TradeHistoryReturn();
                tradeHistoryReturn.setId(tradehistory.getId());
                tradeHistoryReturn.setTime(tradehistory.getTime());
                tradeHistoryReturn.setBuyerid(tradehistory.getBuyerid());
                tradeHistoryReturn.setSellerid(tradehistory.getSellerid());
                Token token = tokenService.getById(tradeService.getById(tradehistory.getTradeid()).getTokenid());
                tradeHistoryReturn.setType(token.getType());
                tradeHistoryReturn.setIsrent(token.getIsrent());
                tradeHistoryReturn.setHash(tradehistory.getHash());
                tradeHistoryReturnList.add(tradeHistoryReturn);
            }
        }
        return tradeHistoryReturnList;
    }

    @ApiOperation("删除交易记录")
    @PostMapping("/deleteTradehistory")
    public String deleteTradehistory(@RequestParam Long id) {
        Tradehistory tradehistory = tradehistoryService.getById(id);
        tradehistory.setIsdelete(1);
        return tradehistoryService.updateById(tradehistory) ? "success" : "fail";
    }

    @ApiOperation("获取出售数据详情")
    @GetMapping("/getDetail")
    public DataOverview getDetail(@RequestParam Long tradeId) {
        Trade trade = tradeService.getById(tradeId);
        Token token = tokenService.getById(trade.getTokenid());
        Uploaddata data = uploaddataService.getById(token.getDataid());

        DataOverview dataOverview = new DataOverview();
        dataOverview.setId(trade.getId());
        dataOverview.setFormat(data.getType());
        dataOverview.setType(Objects.equals(trade.getType(), "1") ? "出租" :
                Objects.equals(trade.getType(), "2") ? "特殊数据" : "出售");
        dataOverview.setDataType(data.getDatatype());
        dataOverview.setDetail(trade.getDetail());
        dataOverview.setName(data.getName());
        dataOverview.setSize(data.getSize());
        dataOverview.setPrice(trade.getPrice().doubleValue());
        dataOverview.setOwner(token.getUserid());
        dataOverview.setTokenId(token.getId());
        dataOverview.setDate(trade.getTime());
        return dataOverview;
    }

    @ApiOperation("获取用户其他两个出售")
    @GetMapping("/getOther")
    public List<Trade> getOther(@RequestParam Long tradeId) {
        Trade trade = tradeService.getById(tradeId);
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("userId",trade.getUserid());
        queryWrapper.eq("isDone",0);
        List list = tradeService.list(queryWrapper);
        // list删掉与tradeId相同的元素
        for(int i=0;i<list.size();i++) {
            if(((Trade)list.get(i)).getId().equals(tradeId)) {
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

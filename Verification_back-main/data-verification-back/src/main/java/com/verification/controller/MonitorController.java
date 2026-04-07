package com.verification.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.verification.domain.*;
import com.verification.service.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

// 监管模块控制器
@RestController
@Api(tags = "监管模块")
@Slf4j
public class MonitorController {
    @Autowired
    AudithistoryService audithistoryService;
    @Autowired
    DatahistoryService datahistoryService;
    @Autowired
    TokenhistoryService tokenhistoryService;
    @Autowired
    TradehistoryService tradehistoryService;
    @Autowired
    TradeService tradeService;

    @ApiOperation(value = "按时间排序获取所有历史")
    @GetMapping("/getHistory")
    public List<Message> getHistory(@RequestParam Long userId) {
        List<Message> messages = new ArrayList<>();
        // 显示2024-03-01注册成功消息
        messages.add(new Message(null,"注册成功！",new Date(2024-1900, Calendar.MARCH,1)));
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("userId",userId);
        List<Audithistory> list = audithistoryService.list(queryWrapper);
        for(Audithistory audit : list) {
            Message message = new Message("账号审核","一位审核人已为您打分，审核结果为通过",audit.getTime(),audit.getId());
            messages.add(message);
        }
        if(list.size() >= 3) {
            // 为防止排序错误，将审核通过消息延后一秒
            Message message = new Message(null,"您的账号已通过审核",new Date(list.get(2).getTime().getTime()+1000));
            messages.add(message);
        }
        List<Datahistory> datahistoryList = datahistoryService.list(queryWrapper);
        for(Datahistory datahistory : datahistoryList) {
            // 如果存在primeHash，说明是更新成功
            String content = null;
            if(datahistory.getPrimehash() != null) {
                content = "您的数据已更新成功，数据ID为" + datahistory.getDataid();
            }else
                content = "您的数据已上传成功，数据ID为" + datahistory.getDataid();
            Message message = new Message("数据管理", content,datahistory.getTime(),datahistory.getId());
            messages.add(message);
        }
        List<Trade> tradeList = tradeService.list(queryWrapper);
        for(Trade trade : tradeList) {
            Message message = new Message("数据出售","您已成功出售ID为" + trade.getTokenid() + "的代币，等待被购买中...",trade.getTime(),trade.getId());
            messages.add(message);
        }
        queryWrapper.eq("isSuccess",1);
        List<Tokenhistory> tokenhistoryList = tokenhistoryService.list(queryWrapper);
        for(Tokenhistory tokenhistory : tokenhistoryList) {
            if(Objects.equals(tokenhistory.getType(), "NFT")){
                Message message = new Message("数据确权","您的数据已确权成功，"+tokenhistory.getType()+"ID为" + tokenhistory.getTokenid(),tokenhistory.getTime(),tokenhistory.getId());
                messages.add(message);
            } else if (Objects.equals(tokenhistory.getType(), "SBT")) {
                if(tokenhistory.getIsupdate() == 1){
                    Message message = new Message("数据确权","您的数据已更新成功，"+tokenhistory.getType()+"ID为" + tokenhistory.getTokenid(),tokenhistory.getTime(),tokenhistory.getId());
                    messages.add(message);
                } else {
                    Message message = new Message("数据确权","您的数据二次确权成功，"+tokenhistory.getType()+"ID为" + tokenhistory.getTokenid(),tokenhistory.getTime(),tokenhistory.getId());
                    messages.add(message);
                }
            }
        }
        // 查找交易历史记录
        QueryWrapper sellQueryWrapper = new QueryWrapper();
        sellQueryWrapper.eq("sellerId",userId);
        List<Tradehistory> tradehistoryList = tradehistoryService.list(sellQueryWrapper);
        for(Tradehistory tradehistory : tradehistoryList) {
            Trade trade = tradeService.getById(tradehistory.getTradeid());
            Message message = new Message("数据流通","您已成功出售ID为" + trade.getTokenid() + "的代币，等待被购买中...",tradehistory.getTime(),tradehistory.getId());
            messages.add(message);
        }
        QueryWrapper buyQueryWrapper = new QueryWrapper();
        buyQueryWrapper.eq("buyerId",userId);
        tradehistoryList = tradehistoryService.list(buyQueryWrapper);
        for(Tradehistory tradehistory : tradehistoryList) {
            Trade trade = tradeService.getById(tradehistory.getTradeid());
            Message message = new Message("数据流通","您已成功购买ID为" + trade.getTokenid() + "的代币，等待被出售中...",tradehistory.getTime(),tradehistory.getId());
            messages.add(message);
        }
        // 将消息按时间倒叙排序
        messages.sort((o1, o2) -> o2.getTime().compareTo(o1.getTime()));
        return messages;
    }

    @ApiOperation(value = "获取一条消息详情")
    @GetMapping("/getMessage")
    public Message getMessage(@RequestParam Long userId,@RequestParam Long id,@RequestParam String type) {
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("userId",userId);
        if(type.equals("账号审核")) {
            Audithistory audit = audithistoryService.getById(id);
            return new Message(audit);
        }else if(type.equals("数据管理")) {
            Datahistory datahistory = datahistoryService.getById(id);
            return new Message(datahistory);
        }else if(type.equals("数据确权")) {
            Tokenhistory tokenhistory = tokenhistoryService.getById(id);
            return new Message(tokenhistory);
        }else if(type.equals("数据流通")) {
            Tradehistory tradehistory = tradehistoryService.getById(id);
            Trade trade = tradeService.getById(tradehistory.getTradeid());
            return new Message(tradehistory,trade.getPrice());
        }else if(type.equals("数据出售")) {
            Trade trade = tradeService.getById(id);
            return new Message(trade);
        }
        return null;
    }
}

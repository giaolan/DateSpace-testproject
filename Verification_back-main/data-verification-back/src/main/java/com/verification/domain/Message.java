package com.verification.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
public class Message {
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id; // 消息ID
    private String type; // 消息类型，包括：数据流通、数据确权、数据管理、账号审核、数据出售
    private String content; // 消息内容
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date time; // 消息时间
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long sender; // 发送者
    private String hash; // 哈希值
    private String contractAddress = "0xffffffffffffffffffffffffffffffffff010000"; // 合约地址
    private Long blockNumber = 5149235L; // 区块号
    // 数据管理
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long dataId; // 数据ID
    private String dataHash; // 数据哈希
    // 数据确权
    private String tokenType; // 代币类型
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long tokenId; // 代币ID
    // 数据流通
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long from; // 出售者
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long to; // 购买者
    private BigDecimal price; // 价格
    // 账号审核
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long userId; // 用户ID

    public Message(String type, String content, Date time,Long id) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.time = time;
    }

    public Message(String type, String content, Date time) {
        this.type = type;
        this.content = content;
        this.time = time;
    }

    public Message(Audithistory audit) {
        this.id = audit.getId();
        this.time = audit.getTime();
        this.sender = audit.getAuditid();
        this.userId = audit.getUserid();
        // 模拟hash，生成一个随机字符串
        this.hash = "0x" + Long.toHexString(System.currentTimeMillis());
    }

    public Message(Tokenhistory tokenhistory){
        this.id = tokenhistory.getId();
        this.time = tokenhistory.getTime();
        this.sender = tokenhistory.getUserid();
        // 模拟hash，生成一个随机字符串
        this.hash = "0x" + Long.toHexString(System.currentTimeMillis());
        this.tokenType = tokenhistory.getType();
        this.tokenId = tokenhistory.getTokenid();
    }

    public Message(Trade trade){
        this.id = trade.getId();
        this.time = trade.getTime();
        this.sender = trade.getUserid();
        // 模拟hash，生成一个随机字符串
        this.hash = "0x" + Long.toHexString(System.currentTimeMillis());
        this.price = trade.getPrice();
    }

    public Message(Tradehistory tradehistory,BigDecimal price){
        this.id = tradehistory.getId();
        this.time = tradehistory.getTime();
        this.hash = tradehistory.getHash();
        this.from = tradehistory.getSellerid();
        this.to = tradehistory.getBuyerid();
        this.price = price;
    }

    public Message(Datahistory datahistory){
        this.id = datahistory.getId();
        this.time = datahistory.getTime();
        this.sender = datahistory.getUserid();
        // 模拟hash，生成一个随机字符串
        this.hash = "0x" + Long.toHexString(System.currentTimeMillis());
        this.dataId = datahistory.getDataid();
        this.dataHash = datahistory.getPrimehash();
    }
}

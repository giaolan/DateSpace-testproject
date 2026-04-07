package com.verification.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class TradeReturn {

    private Integer size;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;

    /**
     * 出售代币Id
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long tokenid;

    /**
     * 1是出租，0是出售
     */
    private String type;

    /**
     * 关键字，以逗号分割
     */
    private List<String> keyword;

    /**
     * 具体描述
     */
    private String detail;

    /**
     * 价格，两位小数
     */
    private BigDecimal price;

    /**
     * 发出时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date time;

    /**
     * 名字
     */
    private String name;

    /**
     * 用户id
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long userid;

    // 构造函数
    public TradeReturn(Trade trade) {
        this.id = trade.getId();
        this.tokenid = trade.getTokenid();
        this.type = trade.getType();
        // keyword是以,为分割的字符串，这里将其分割为List
        String[] keywords = trade.getKeyword().split(",");
        this.keyword = new ArrayList<>();
        for (String keyword : keywords) {
            this.keyword.add(keyword);
            this.detail = trade.getDetail();
            this.price = trade.getPrice();
            this.time = trade.getTime();
            this.name = trade.getName();
            this.userid = trade.getUserid();
        }
    }
}

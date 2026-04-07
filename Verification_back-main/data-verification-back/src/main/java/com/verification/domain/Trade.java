package com.verification.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 *
 * @TableName trade
 */
@TableName(value ="trade")
@Data
public class Trade implements Serializable {
    /**
     *
     */
    @TableId
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;

    /**
     * 出售代币Id
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long tokenid;

    /**
     * 1是出租，0是出售，2是特殊数据
     */
    private String type;

    /**
     * 关键字，以逗号分割
     */
    private String keyword;

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
     * 是否完成
     */
    private Integer isdone;

    /**
     * 名字
     */
    private String name;

    /**
     * 用户id
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long userid;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}

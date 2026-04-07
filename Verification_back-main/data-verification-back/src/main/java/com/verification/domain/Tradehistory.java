package com.verification.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 *
 * @TableName tradehistory
 */
@TableName(value ="tradehistory")
@Data
public class Tradehistory implements Serializable {
    /**
     *
     */
    @TableId
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;

    /**
     * 交易id
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long tradeid;

    /**
     * 购买者id
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long buyerid;

    /**
     * 交易时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date time;

    /**
     * 出售者id
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long sellerid;

    /**
     *
     */
    private String hash;

    /**
     * 1表示删除
     */
    private Integer isdelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}

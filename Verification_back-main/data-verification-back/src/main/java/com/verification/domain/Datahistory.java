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
 * @TableName datahistory
 */
@TableName(value ="datahistory")
@Data
public class Datahistory implements Serializable {
    /**
     *
     */
    @TableId
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;

    /**
     *
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long dataid;

    /**
     *
     */
    private String primehash;

    /**
     *
     */
    private String nowhash;

    /**
     *
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date time;

    /**
     *
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long userid;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}

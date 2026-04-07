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
 * @TableName audithistory
 */
@TableName(value ="audithistory")
@Data
public class Audithistory implements Serializable {
    /**
     *
     */
    @TableId
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;

    /**
     * 用户id
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long userid;

    /**
     * 审核人id
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long auditid;

    /**
     * 分数，60为合格
     */
    private Integer score;

    /**
     * 打分时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date time;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}

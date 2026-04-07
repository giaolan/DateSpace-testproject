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
 * @TableName tokenhistory
 */
@TableName(value ="tokenhistory")
@Data
public class Tokenhistory implements Serializable {
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
     * 是否操作成功，0是失败，1是成功
     */
    private Integer issuccess;

    /**
     * 申请时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date time;

    /**
     * 代币id
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long tokenid;

    /**
     * 失败原因
     */
    private String msg;

    /**
     * 申请代币类型
     */
    private String type;

    /**
     * 是否更新，0是申请，1是更新
     */
    private Integer isupdate;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}

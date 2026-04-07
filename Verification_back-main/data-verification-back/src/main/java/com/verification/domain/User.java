package com.verification.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;

/**
 *
 * @TableName user
 */
@TableName(value ="user")
@Data
public class User implements Serializable {
    /**
     *
     */
    @TableId
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码
     */
    private String password;

    /**
     * 是否准入，0是不允许，1是允许。
     */
    private Integer isadmit;

    /**
     * 是否为审核人，0是不是，1是是。
     */
    private Integer isaudit;

    /**
     * 审核人id，逗号分割。
     */
    private String auditid;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}

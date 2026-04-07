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
 * @TableName token
 */
@TableName(value ="token")
@Data
public class Token implements Serializable {
    /**
     *
     */
    @TableId
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;

    /**
     * 持有者id（目前所在）
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long userid;

    /**
     * 代币类型，NFT or SBT
     */
    private String type;

    /**
     * 申请代币时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createtime;

    /**
     * NFT属于的SBT id
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long include;

    /**
     * 是否为租用，0是否，1是是
     */
    private Integer isrent;

    /**
     * 如果是租用，所有者id（所有者）
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long ownerid;

    /**
     * 如果是NFT，数据id
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long dataid;

    /**
     * 关键词，以逗号分隔
     */
    private String keyword;

    /**
     * 详情
     */
    private String detail;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}

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
 * @TableName uploaddata
 */
@TableName(value ="uploaddata")
@Data
public class Uploaddata implements Serializable {
    /**
     *
     */
    @TableId
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;

    /**
     * 所有者id
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long userid;

    /**
     * 上传到ipfs返回的hash值
     */
    private String hash;

    /**
     * 文件后缀
     */
    private String type;

    /**
     * 数据关键字，逗号分隔
     */
    private String keyword;

    /**
     * 数据详细信息
     */
    private String detail;

    /**
     * 最后一次更新时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date time;

    /**
     * 是否被删除
     */
    private Integer isdeleted;

    /**
     * 数据名称
     */
    private String name;

    /**
     * 数据量
     */
    private Integer size;

    /**
     * 数据类型，比如数字、文本、图片、视频等
     */
    private String datatype;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}

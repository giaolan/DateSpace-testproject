package com.verification.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class DataOverview {
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long owner;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long tokenId;

    private String format;

    private String type;   // 出售类型 0 出售 1 出租

    private String detail;

    private String name;

    private Integer size;

    private double price;

    private String dataType;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date date;

}

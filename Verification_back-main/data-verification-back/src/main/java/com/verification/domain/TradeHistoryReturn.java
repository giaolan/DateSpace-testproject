package com.verification.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@Data
public class TradeHistoryReturn {
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long buyerid;

    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Long sellerid;

    private String hash;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date time;
    private String type;
    private Integer isrent;

}

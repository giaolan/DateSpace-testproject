package com.verification.service;

import cn.hutool.http.server.HttpServerResponse;
import com.baomidou.mybatisplus.extension.service.IService;
import com.verification.domain.Uploaddata;

import java.io.UnsupportedEncodingException;

/**
* @author DELL
* @description 针对表【uploaddata】的数据库操作Service
* @createDate 2024-04-27 14:44:20
*/
public interface UploaddataService extends IService<Uploaddata> {
    String uploadData(Long userId,String file,String keyword,String detail);

    String updateData(Long dataId, String file);

    void getData(Long dataId, HttpServerResponse outputStream) throws UnsupportedEncodingException;
}

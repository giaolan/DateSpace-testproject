package com.verification.service.impl;

import cn.hutool.http.server.HttpServerResponse;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.verification.domain.Datahistory;
import com.verification.domain.Uploaddata;
import com.verification.mapper.DatahistoryMapper;
import com.verification.mapper.UploaddataMapper;
import com.verification.service.IpfsService;
import com.verification.service.UploaddataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Date;

/**
* @author DELL
* @description 针对表【uploaddata】的数据库操作Service实现
* @createDate 2024-04-27 14:44:20
*/
@Service
public class UploaddataServiceImpl extends ServiceImpl<UploaddataMapper, Uploaddata>
    implements UploaddataService{
    @Autowired
    private UploaddataMapper uploaddataMapper;
    @Autowired
    private IpfsService ipfsService;
    @Autowired
    private DatahistoryMapper datahistoryMapper;

    @Override
    public String uploadData(Long userId,String file,String keyword,String detail) {
        // 将数据上传到IPFS
        String hash = null;
        try {
            hash = ipfsService.uploadToIpfs("/usr/local/java/data/" + file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        // 如果哈希值在数据库中已存在,则说明为重复数据，不允许上传
        QueryWrapper<Uploaddata> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("hash", hash);
        if (uploaddataMapper.selectOne(queryWrapper) != null) {
            return "重复数据不允许用于确权";
        }
        // 将数据上传到数据库
        Uploaddata uploaddata = new Uploaddata();
        uploaddata.setUserid(userId);
        uploaddata.setHash(hash);
        uploaddata.setType(file.substring(file.lastIndexOf(".")));
        uploaddata.setDatatype("数字");
        uploaddata.setTime(new Date());
        uploaddata.setKeyword(keyword);
        uploaddata.setDetail(detail);
        uploaddataMapper.insert(uploaddata);
        // 将数据上传历史记录到数据库
        Datahistory datahistory = new Datahistory();
        datahistory.setUserid(userId);
        datahistory.setDataid(uploaddata.getId());
        datahistory.setNowhash(hash);
        datahistory.setTime(new Date());
        datahistory.setDataid(uploaddata.getId());
        datahistoryMapper.insert(datahistory);
        // 将文件从本地删除
        File file1 = new File("/usr/local/java/data/" + file);
        if (file1.exists()) {
            file1.delete();
        }
        String id = uploaddata.getId().toString();
        id += "x";
        return id;
    }

    @Override
    public String updateData(Long dataId, String file) {
        // 将数据上传到IPFS
        String hash = null;
        try {
            hash = ipfsService.uploadToIpfs("usr/local/java/data/" + file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        // 将数据库哈希值更新
        Uploaddata uploaddata = uploaddataMapper.selectById(dataId);
        uploaddata.setTime(new Date());
        uploaddata.setType(file.substring(file.lastIndexOf(".")));
        // 将数据上传历史记录到数据库
        Datahistory datahistory = new Datahistory();
        datahistory.setUserid(uploaddata.getUserid());
        datahistory.setDataid(dataId);
        datahistory.setPrimehash(uploaddata.getHash());
        datahistory.setNowhash(hash);
        datahistory.setTime(new Date());
        datahistoryMapper.insert(datahistory);
        // 更新数据哈希
        uploaddata.setHash(hash);
        // 将文件从本地删除
        File file1 = new File("/usr/local/java/data/" + file);
        if (file1.exists()) {
            file1.delete();
        }
        return uploaddataMapper.updateById(uploaddata) > 0 ? "success" : "fail";
    }

    @Override
    public void getData(Long dataId, HttpServerResponse res) throws UnsupportedEncodingException {
        Uploaddata uploaddata = uploaddataMapper.selectById(dataId);
        ipfsService.downFromIpfs(uploaddata.getHash(), "/usr/local/java/data/" + dataId + uploaddata.getType());
        File file = new File("/usr/local/java/data/" + dataId + uploaddata.getType());
        res.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(dataId + uploaddata.getType(), "UTF-8"));
        res.setContentType("application/octet-stream");
        // 获取输出流
        res.write(file);
        // 删除文件
        file.delete();
    }
}





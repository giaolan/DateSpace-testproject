package com.verification.controller;

import cn.hutool.http.server.HttpServerResponse;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.verification.domain.Uploaddata;
import com.verification.service.TokenService;
import com.verification.service.UploaddataService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

// 数据管理模块控制器
@Api(tags = "数据管理模块")
@RestController
@Slf4j
public class DataController {
    @Autowired
    private UploaddataService uploaddataService;
    @Autowired
    private TokenService tokenService;

    @ApiOperation("上传数据")
    @PostMapping("/uploadData")
    public String upload(@RequestParam Long userId,@RequestParam("file") MultipartFile file,@RequestParam(required = false) String keyword,@RequestParam(required = false) String detail) {
        if (!file.isEmpty()) {
            String e = uploadFile(file);
            if (e != null) return e;
            return uploaddataService.uploadData(userId,Objects.requireNonNull(file.getOriginalFilename()),keyword,detail);
        } else {
            return "文件为空";
        }
    }

    @ApiOperation("添加数据详情")
    @PostMapping("/addDataDetail")
    public String addDataDetail(@RequestParam Long dataId,@RequestParam(required = false)String keyword,@RequestParam(required = false) String detail) {
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("dataId",dataId);
        Uploaddata uploaddata = uploaddataService.getOne(queryWrapper);
        if(uploaddata==null) {
            return "数据不存在";
        }
        uploaddata.setDetail(detail);
        uploaddata.setKeyword(keyword);
        return uploaddataService.updateById(uploaddata)?"success":"fail";
    }

    @ApiOperation("删除数据")
    @PostMapping("/deleteData")
    public String deleteData(@RequestParam String dataId) {
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("dataId",dataId);
        Uploaddata uploaddata = uploaddataService.getOne(queryWrapper);
        if(uploaddata==null) {
            return "数据不存在";
        }
        uploaddata.setIsdeleted(1);
        return uploaddataService.updateById(uploaddata)?"success":"fail";
    }

    @ApiOperation("更新数据")
    @PostMapping("/updateData")
    public String updateData(@RequestParam Long dataId, @RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            String e = uploadFile(file);
            if (e != null) return e;
            return uploaddataService.updateData(dataId,Objects.requireNonNull(file.getOriginalFilename()));
        } else {
            return "文件为空";
        }
    }

    @ApiOperation("获取数据列表")
    @GetMapping("/getDatas")
    public List<Uploaddata> getDatas(@RequestParam Long userId) {
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("userId",userId);
        queryWrapper.eq("isDeleted",0);
        return uploaddataService.list(queryWrapper);
    }

    @ApiOperation("获取未确权数据")
    @GetMapping("/getUnverifiedDatas")
    public List<Uploaddata> getUnverifiedDatas(@RequestParam Long userId) {
        QueryWrapper queryWrapper = new QueryWrapper();
        queryWrapper.eq("userId",userId);
        queryWrapper.eq("isDeleted",0);
        List<Uploaddata> list = uploaddataService.list(queryWrapper);
        List<Uploaddata> returnList = new ArrayList<>();
        for(Uploaddata uploaddata:list) {
            QueryWrapper queryWrapper1 = new QueryWrapper();
            queryWrapper1.eq("dataId",uploaddata.getId());
            System.out.println(tokenService.list(queryWrapper1));
            if(tokenService.list(queryWrapper1).size()==0) {
                returnList.add(uploaddata);
            }
        }
        return returnList;
    }

    @ApiOperation("获取数据")
    @GetMapping("/getData")
    public void getData(@RequestParam Long dataId, HttpServerResponse res) throws UnsupportedEncodingException {
        uploaddataService.getData(dataId,res);
    }

    @Nullable
    private String uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            BufferedOutputStream out = new BufferedOutputStream(
                    Files.newOutputStream(new File("/usr/local/java/data/" + Objects.requireNonNull(file.getOriginalFilename())).toPath()));
            out.write(file.getBytes());
            out.flush();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
            return "上传失败," + e.getMessage();
        }
        return null;
    }

    @ApiOperation("获取热门数据")
    @GetMapping("/getHotDatas")
    public List<Uploaddata> getHotDatas() {
        List<Uploaddata> list = uploaddataService.list();
        // 如果超过10条数据，只返回前10条
        if(list.size()>10) {
            return list.subList(0,10);
        }
        return list;
    }
}

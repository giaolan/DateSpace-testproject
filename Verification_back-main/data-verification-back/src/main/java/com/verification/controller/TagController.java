package com.verification.controller;

import com.verification.util.HttpRequestHelper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * 用户查询标签查询相关接口
 */
@Api(tags = "用户查询标签查询相关接口")
@RestController
@Slf4j
public class TagController {

    @Resource
    private HttpRequestHelper httpRequestHelper;

    @ApiOperation("用户查询标签")
    @GetMapping("/queryByName")
    public String queryByName(@RequestParam String name) {

        String url="http://localhost:3306/blog";
        //组装请求参数
        Map<String,Object> parmMap =new HashMap<String,Object>();
        String result = httpRequestHelper.get(url, parmMap);
        System.out.println(result);
        return result;
    }

}

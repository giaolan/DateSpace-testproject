package com.verification.controller;

import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "测试模块")
@RestController
@Slf4j
public class TestController {

    @GetMapping("/test")
    public String test() {
        return "test";
    }
}

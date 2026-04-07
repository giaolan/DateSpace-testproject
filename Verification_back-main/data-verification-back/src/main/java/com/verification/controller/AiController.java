package com.verification.controller;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "ai获取模块")
@RequestMapping("/ai")
public class AiController {
    static String apikey = "sk-d28b1d3cdd6a4057aa810056ea28b2c1";
    //使用该apikey进行deepseek的调用

    // 接收前端传来的 String，并返回一个处理后的 String
    @PostMapping("/process")
    public String processString(@RequestBody String inputString) {

        // 这里可以进行一些处理操作，例如将字符串转换为大写
        String outputString = "Processed: " + inputString.toUpperCase();

        // 返回处理后的字符串
        return outputString;
    }
}
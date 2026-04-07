package com.verification.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags="邮件模块")
public class EmailController {
    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String account;

    public EmailController(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @ApiOperation("发送验证码")
    @GetMapping("/sendMail/{address}")
    public String sendSimpleMail(@PathVariable String address){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(account);
        message.setTo(address);
        message.setSubject("验证码");
        //生成验证码
        String code = String.valueOf((int)((Math.random()*9+1)*100000));
        // 欢迎来到：数维链——区块链+AI双轮驱动下的数据层级确权与安全流通平台
        message.setText("欢迎来到：数维链——区块链+AI双轮驱动下的数据层级确权与安全流通平台，您的验证码为："+code);
        javaMailSender.send(message);
        return code;
    }

}

package com.verification.controller;

import cn.hutool.core.util.HashUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.verification.domain.Audithistory;
import com.verification.domain.User;
import com.verification.service.AudithistoryService;
import com.verification.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

// 准入模块控制器
@Api(tags = "准入模块")
@RestController
@Slf4j
public class AdmitController {
    @Autowired
    private UserService userService;
    @Autowired
    private AudithistoryService audithistoryService;

    @ApiOperation("登录")
    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        return userService.login(username, password);
    }

    @ApiOperation("注册")
    @PostMapping("/register")
    public String register(@RequestParam String username, @RequestParam String password) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(String.valueOf(HashUtil.mixHash(Arrays.toString(password.getBytes()))));
        return userService.register(user);
    }

    @ApiOperation("审核人打分")
    @PostMapping("/score")
    public String score(@RequestParam Long auditHistoryId, @RequestParam Integer score) {
        QueryWrapper<Audithistory> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", auditHistoryId);
        Audithistory audithistory = audithistoryService.getOne(queryWrapper);
        if (audithistory == null) {
            return "fail";
        }
        audithistory.setScore(score);
        return audithistoryService.updateById(audithistory) ? "success" : "fail";
    }

    @ApiOperation("查看用户是否通过审核")
    @GetMapping("/isPass")
    public String isPass(@RequestParam Long userId) {
        User user = userService.getById(userId);
        if (user == null) {
            return "fail";
        }
        return user.getIsadmit() == 1 ? "pass" : "fail";
    }
}

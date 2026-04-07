package com.verification.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.verification.domain.User;

/**
* @author DELL
* @description 针对表【user】的数据库操作Service
* @createDate 2024-03-04 19:05:40
*/
public interface UserService extends IService<User> {
    /**
     * 用户登录
     * @return 登录结果
     */
    String login(String username,String password);
    String register(User user);
}

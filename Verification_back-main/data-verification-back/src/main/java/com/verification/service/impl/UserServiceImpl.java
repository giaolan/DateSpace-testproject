package com.verification.service.impl;

import cn.hutool.core.util.HashUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.verification.domain.User;
import com.verification.mapper.UserMapper;
import com.verification.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
* @author DELL
* @description 针对表【user】的数据库操作Service实现
* @createDate 2024-03-04 19:05:40
*/
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
    implements UserService{
    @Autowired
    public UserMapper userMapper;
    @Override
    public String login(String username,String password) {
        QueryWrapper<User> wrapper=new QueryWrapper<>();
        wrapper.eq("username",username);
        User user = userMapper.selectOne(wrapper);
        if(user==null){
            return "用户不存在";
        }
        String pwd = user.getPassword();
        if (pwd.equals(String.valueOf(HashUtil.mixHash(Arrays.toString(password.getBytes()))))){
            String id = user.getId().toString();
            id += "x";
            return id;
        }else {
            return "登录失败";
        }
    }

    @Override
    public String register(User user) {
        QueryWrapper<User> wrapper=new QueryWrapper<>();
        wrapper.eq("username",user.getUsername());
        User user1 = userMapper.selectOne(wrapper);
        if(user1!=null){
            return "用户已存在";
        }
        // 查找所有审核人
        List<User> users = userMapper.selectList(new QueryWrapper<User>().eq("isAudit", 1));
        // 选择5个审核人
        StringBuilder auditorId = new StringBuilder();
        for (int i = 0; i < 5; i++) {
            auditorId.append(users.get(i).getId().toString());
            if (i != 4) {
                auditorId.append(",");
            }
        }
        user.setAuditid(auditorId.toString());
        userMapper.insert(user);
        String id = user.getId().toString();
        id += "x";
        return id;
    }

}





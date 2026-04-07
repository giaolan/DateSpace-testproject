package com.verification.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.verification.domain.Token;
import com.verification.service.TokenService;
import com.verification.mapper.TokenMapper;
import org.springframework.stereotype.Service;

/**
* @author DELL
* @description 针对表【token】的数据库操作Service实现
* @createDate 2024-04-27 15:45:55
*/
@Service
public class TokenServiceImpl extends ServiceImpl<TokenMapper, Token>
    implements TokenService{

}





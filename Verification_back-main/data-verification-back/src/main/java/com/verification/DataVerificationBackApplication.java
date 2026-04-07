package com.verification;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.verification.mapper")
public class DataVerificationBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(DataVerificationBackApplication.class, args);
    }

}

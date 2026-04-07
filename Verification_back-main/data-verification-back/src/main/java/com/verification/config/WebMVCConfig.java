package com.verification.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ConcurrentTaskExecutor;
import org.springframework.web.servlet.config.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;

@Configuration
public class WebMVCConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOriginPatterns("*")
                .allowedMethods("*")
                .allowedOrigins("http://www.harvoe.com")
                .allowCredentials(true).maxAge(3600);

    }

    @Override
    public void configureAsyncSupport(AsyncSupportConfigurer configurer){
        configurer.setTaskExecutor(new ConcurrentTaskExecutor(Executors.newFixedThreadPool(3)));
        configurer.setDefaultTimeout(30000);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 解决swagger无法访问
        registry.addResourceHandler("/swagger-ui.html").
                addResourceLocations("classpath:/META-INF/resources/");
        // 解决swagger的js文件无法访问
        registry.addResourceHandler("/webjars/**").
                addResourceLocations("classpath:/META-INF/resources/webjars/");

    }

}

package com.verification.util;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Component
public class HttpRequestHelper {

    @Resource
    private RestTemplate restTemplate;

    //一些自定义的请求头参数
    public static final String supplierID = "";
    public static final String interfacekey = "";


    /**
     * get请求 返回 string
     *
     * @param url      请求的url
     * @param jsonData 请求的json
     * @return
     */
    public String restGet(String url, String jsonData) {
        return request(url, jsonData, HttpMethod.GET);
    }

    /**
     * Get请求获取实体类
     *
     * @param url          请求的url
     * @param responseType 返回的类型
     * @param parms        不限定个数的参数
     * @param <T>          泛型
     * @return
     */
    public <T> T getForEntity(String url, Class<T> responseType, Object... parms) {
        return (T) restTemplate.getForEntity(url, responseType, parms);
    }

    /**
     * Get请求
     *
     * @param url
     * @param parm
     * @return
     */
    public String get(String url, Map<String, Object> parm) {
        return restTemplate.getForEntity(url, String.class, parm).getBody();
    }



    /**
     * @param url        请求的url
     * @param jsonData   json数据
     * @param httpMethod
     * @return
     */
    private String request(String url, String jsonData, HttpMethod httpMethod) {
        ResponseEntity<String> response = null;
        try {
            HttpEntity<String> requestEntity = new HttpEntity<String>(jsonData);
            response = restTemplate.exchange(url, httpMethod, requestEntity, String.class);
        } catch (Exception ex) {
            ex.printStackTrace();
            return "";
        }
        return response.getBody().toString();
    }

    /**
     * DLT专用执行方法
     *
     * @param param  请求参数：可以添加一些常量请求值
     * @param url    访问的url
     * @param method 请求的方法
     * @return
     */
    private String execute(Map<String, Object> param, String url, HttpMethod method) {
        HttpHeaders headers = this.getDefaultHeader();
        Map<String, Object> requestor = this.getDefaultParam();
        param.put("requestor", requestor);
        param.put("supplierID", supplierID);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(param, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, method, requestEntity, String.class);
        return response.getBody();
    }


    /**
     * 获取默认的头请求信息
     */
    private HttpHeaders getDefaultHeader() {
        String timestamp = "" + System.currentTimeMillis();
        String signature = encoderByMd5(supplierID + timestamp + interfacekey);
        HttpHeaders headers = new HttpHeaders();
        headers.add("signature", signature);
        headers.add("timestamp", timestamp);
        return headers;
    }

    /**
     * 获取默认的参数
     */
    private Map<String, Object> getDefaultParam() {
        Map<String, Object> defParam = new HashMap<>();
        defParam.put("invoker", "xx");
        defParam.put("operatorName", "xx");
        return defParam;
    }


    public static String encoderByMd5(String str) {
        if (str == null) {
            return null;
        }
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte[] digest = md5.digest(str.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder()  // 使用JDK标准Base64编码器
                    .encodeToString(digest)
                    .toUpperCase(); // 保持原大写转换逻辑
        } catch (NoSuchAlgorithmException e) {
            // 理论上不会发生，所有Java实现必须支持MD5
            return null;
        }
    }
}
package com.verification.service.impl;

import com.verification.service.BlockchainService;
import okhttp3.OkHttpClient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Service
public class BlockchainServiceImpl implements BlockchainService {
    private String url = "http://localhost:7545";

    public Web3j getConnection() {
        OkHttpClient oc = new OkHttpClient.Builder()
                .connectTimeout(60 * 5, TimeUnit.SECONDS)
                .readTimeout(60 * 5, TimeUnit.SECONDS)
                .writeTimeout(60 * 5, TimeUnit.SECONDS)
                .build();
        HttpService httpService = new HttpService(url, oc);
        return Web3j.build(httpService);
    }

    @Test
    public void test() throws IOException {
        Web3j web3j = getConnection();
        web3j.ethAccounts().send().getAccounts().forEach(System.out::println);
    }
}

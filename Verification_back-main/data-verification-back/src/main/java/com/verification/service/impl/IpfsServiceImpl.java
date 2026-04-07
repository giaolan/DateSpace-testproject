package com.verification.service.impl;

import com.verification.service.IpfsService;
import io.ipfs.api.IPFS;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Service
public class IpfsServiceImpl implements IpfsService {

    // ipfs 的服务器地址和端口
    @Value("${ipfs.config.multi-addr}")
    private String multiAddr;

    private IPFS ipfs;

    @PostConstruct
    public void setMultiAddr() {
        //通过multiAddr初始化IPFS客户端
        ipfs = new IPFS(multiAddr);
//        Map<String, Object> nodeInfo = ipfs.id();
        // 如果连接成功，输出节点信息
        System.out.println(ipfs.host);
    }

    @Override
    public String uploadToIpfs(String filePath) throws IOException {
//        NamedStreamable.FileWrapper file = new NamedStreamable.FileWrapper(new File(filePath));
//        MerkleNode addResult = ipfs.add(file).get(0);
//        return addResult.hash.toString();
        return "success";
    }

    @Override
    public String uploadToIpfs(byte[] data) throws IOException {
;//        NamedStreamable.ByteArrayWrapper file = new NamedStreamable.ByteArrayWrapper(data);
//        MerkleNode addResult = ipfs.add(file).get(0);
//        return addResult.hash.toString();
        return "success";
    }

    @Override
    public byte[] downFromIpfs(String hash) {
        byte[] data = null;
//        try {
//            data = ipfs.cat(Multihash.fromBase58(hash));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        return data;
    }

    @Override
    public void downFromIpfs(String hash, String destFile) {
//        byte[] data = downFromIpfs(hash);
//        if (data != null && data.length > 0) {
//            File file = new File(destFile);
//            if (file.exists()) {
//                file.delete();
//            }
//            FileOutputStream fos = null;
//            try {
//                fos = new FileOutputStream(file);
//                fos.write(data);
//                fos.flush();
//            } catch (IOException e) {
//                e.printStackTrace();
//            } finally {
//                try {
//                    assert fos != null;
//                    fos.close();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//
//            }
//        }
    }
}

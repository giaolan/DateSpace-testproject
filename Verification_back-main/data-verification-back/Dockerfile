# 基础镜像
FROM openjdk:8-jdk-alpine
# 作者
MAINTAINER  cjm
# 工作目录
WORKDIR /usr/local/java
# 同步docker内部时间
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# 设置时区
ENV TZ=Asia/Shanghai
EXPOSE 8888
# 复制jar包到/usr/local/java目录下
ARG JAR_FILE
ADD ${JAR_FILE} ./data-verification-back-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["nohup","java","-Dspring.config.location=classpath:/application.yml","-jar","/usr/local/java/data-verification-back-0.0.1-SNAPSHOT.jar",">","/usr/local/java/data-verification-back-0.0.1-SNAPSHOT.log","&>","&"]

package com.dodofly.cms;

import io.prometheus.client.hotspot.DefaultExports;
import io.prometheus.client.spring.boot.EnablePrometheusEndpoint;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@ImportResource("classpath:beanRefContext.xml")
@EnableAutoConfiguration
@Configuration
@EnableDiscoveryClient
//@MapperScan(basePackages = "com.dodofly.cms.dao")
@EnablePrometheusEndpoint
@EnableFeignClients
@Slf4j
public class DodoflyCmsApplication {
    //  @Resource
    // private LoginCheckInterceptor loginCheckInterceptor;

    @PostConstruct
    public void init() {
        DefaultExports.initialize();
    }

    public static void main(String[] args) {
        log.info("==================DodoflyCmsApplication start .......======================");
        /* 修改时区为东8区，否则部分日期转换有问题 */
        TimeZone.setDefault(TimeZone.getTimeZone("GMT+8"));
        SpringApplication.run(DodoflyCmsApplication.class, args);
        log.info("==================DodoflyCmsApplication start success======================");
    }

    /**
     * 配置拦截器
     *
     * @author lance
     * @param registry
     */

    /*
     * public void addInterceptors(InterceptorRegistry registry) {
     * registry.addInterceptor(loginCheckInterceptor).addPathPatterns("/dodofly/**")
     * ; }
     */
}

package com.aistudio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AiStudioApplication {

    public static void main(String[] args) {
        SpringApplication.run(AiStudioApplication.class, args);
    }
}

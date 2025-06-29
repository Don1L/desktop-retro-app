package com.example.desktop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication // эта аннотация уже включает @Configuration, @EnableAutoConfiguration и
                       // @ComponentScan
public class DesktopApplication {

    public static void main(String[] args) {
        SpringApplication.run(DesktopApplication.class, args);
    }

    /**
     * Кросс-доменные запросы.
     * Если хочешь жёстко указать домен фронта — замени "*" на свой URL.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("*");
            }
        };
    }
}

package com.example.posting_service.common.service;

import com.example.posting_service.common.entity.NotificationEntity;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "notification-service")
public interface NotificationRestClientInterface {

    @PostMapping(value = "/notifications/sendNotification",
            consumes = "application/json",
            produces = "application/json")
    public NotificationEntity sendNotification(
            @RequestParam int userId,
            @RequestBody NotificationEntity notificationEntity
    );

}

package com.example.notification_service.controller;

import com.example.notification_service.entity.NotificationEntity;
import com.example.notification_service.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping(value = "/sendNotification",
            consumes = "application/json",
            produces = "application/json")
    public NotificationEntity sendNotification(
            @RequestParam int userId,
            @RequestBody NotificationEntity notificationEntity
    ){
        return notificationService.sendNotification(userId, notificationEntity);
    }

}

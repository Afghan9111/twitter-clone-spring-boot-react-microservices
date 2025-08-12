package com.example.notification_service.service;

import com.example.notification_service.entity.NotificationEntity;
import com.example.notification_service.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final NotificationRepository notificationRepository;

    public NotificationEntity sendNotification(int userId, NotificationEntity notificationEntity){
        log.info("sending ws notification to {} with payload {}", userId, notificationEntity);
        NotificationEntity savedNotificationEntity = saveNotification(notificationEntity);
        log.info("SAVING NOTIFICATION - {}", savedNotificationEntity);
        simpMessagingTemplate.convertAndSendToUser(
                String.valueOf(userId),
                "/notification",
                savedNotificationEntity);
        return savedNotificationEntity;
    }

    public NotificationEntity saveNotification(NotificationEntity notificationEntity){
        return notificationRepository.save(notificationEntity);
    }

    public List<NotificationEntity> getNotificationsByUser(int userId){
        return notificationRepository.findByNotifiedUserId(userId);
    }
}

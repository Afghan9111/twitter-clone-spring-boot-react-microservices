package com.example.posting_service.common.entity;

import com.example.posting_service.common.enums.NotificationStatus;
import com.example.posting_service.common.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data @AllArgsConstructor @NoArgsConstructor @Builder
public class NotificationEntity {

    private Long notificationId;
    private NotificationType notificationType;
    private NotificationStatus notificationStatus = NotificationStatus.UNREAD;
    private Timestamp notificationTime;
    private Integer notifiedUserId;
    private Integer triggeredByUserId;
}


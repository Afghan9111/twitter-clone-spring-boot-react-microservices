package com.example.posting_service.likes.service;

import com.example.posting_service.common.entity.NotificationEntity;
import com.example.posting_service.common.enums.NotificationStatus;
import com.example.posting_service.common.enums.NotificationType;
import com.example.posting_service.common.service.NotificationRestClientInterface;
import com.example.posting_service.likes.entity.LikeEntity;
import com.example.posting_service.likes.repository.LikeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class LikeServiceImpl implements LikeService{

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private NotificationRestClientInterface notificationRestClientInterface;

    @Override
    public LikeEntity saveLikeEntity(LikeEntity likeEntity) {
        LikeEntity savedLike = likeRepository.save(likeEntity);

        NotificationEntity notificationEntity = notificationRestClientInterface.sendNotification(
                savedLike.getLikedPost().getUserId(),
                NotificationEntity.builder()
                        .notificationStatus(NotificationStatus.UNREAD)
                        .notifiedUserId(likeEntity.getLikedPost().getUserId())
                        .notificationTime(new Timestamp(System.currentTimeMillis()))
                        .notificationType(NotificationType.LIKES)
                        .triggeredByUserId(likeEntity.getLikedByUserId())
                        .build()
                );
        log.info("NOTIFICATION ENTITY - {}", notificationEntity);
        return savedLike;
    }

    @Override
    public LikeEntity getLikeEntityById(Long likeId) {
        Optional<LikeEntity> optionalLikeEntity = likeRepository.findById(likeId);
        return optionalLikeEntity.orElse(null);
    }

    @Override
    public String deleteByLikeEntity(LikeEntity likeEntity) {
        try {
            likeRepository.delete(likeEntity);
            return "success";
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return "failure";
        }
    }

    // THIS TO FIND LIKE ENTITY BY POST ID. TO CALCULATE NUMBER OF LIKES A POST HAS
    @Override
    public List<LikeEntity> getLikesByPostId(Long postId) {
        return likeRepository.findAllByLikedPost_PostId(postId);
    }

    // THIS IS TO FIND LIKE ENTITY BY LIKED POST ID AND LIKED BY USER ID
    @Override
    public LikeEntity getLikeEntityByLikedPostIdAndLikedByUserId(Long likedPostId, int likedByUserid) {
        Optional<LikeEntity> optionalLikeEntity = likeRepository.findByLikedPost_PostIdAndLikedByUserId(likedPostId, likedByUserid);
        return optionalLikeEntity.orElse(null);
    }

    // THIS IS TO FIND ALL THE POSTS A USER HAS LIKED
    @Override
    public List<LikeEntity> getLikeEntityByLikedUserId(int userId) {
        return likeRepository.findAllByLikedByUserId(userId);
    }
}

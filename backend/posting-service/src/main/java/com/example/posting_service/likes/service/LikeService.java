package com.example.posting_service.likes.service;

import com.example.posting_service.likes.entity.LikeEntity;

import java.util.List;

public interface LikeService {

    LikeEntity saveLikeEntity(LikeEntity likeEntity);

    LikeEntity getLikeEntityById(Long likeId);

    String deleteByLikeEntity(LikeEntity likeEntity);

    List<LikeEntity> getLikesByPostId(Long postId);

    LikeEntity getLikeEntityByLikedPostIdAndLikedByUserId(Long likedPostId, int likedByUserid);

    List<LikeEntity> getLikeEntityByLikedUserId(int userId);
}

package com.example.posting_service.likes.controller;

import com.example.posting_service.likes.entity.LikeEntity;
import com.example.posting_service.likes.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/like")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("/addLike")
    public LikeEntity addLike(@RequestBody LikeEntity likeEntity){
        return likeService.saveLikeEntity(likeEntity);
    }

    @GetMapping("/getLikeEntityById")
    public LikeEntity getLikeEntityById(@RequestParam Long likeId){
        return likeService.getLikeEntityById(likeId);
    }

    // THIS TO GET LIST OF LIKE ENTITY BY POST ID.
    @GetMapping("/getLikesByPostId")
    public List<LikeEntity> getLikesListByPostId(@RequestParam Long postId){
        return likeService.getLikesByPostId(postId);
    }

    //  TO CALCULATE NUMBER OF LIKES A POST HAS
    @GetMapping("/getPostLikesCount")
    public int getPostLikesCount(@RequestParam Long postId){
        int likes = likeService.getLikesByPostId(postId).size();
        return likes;
    }


    @PostMapping("/deleteLikeEntity")
    public String deleteLikeEntity(@RequestParam Long likedPostId,
                                   @RequestParam int likedByUserId){
        LikeEntity likeEntity = likeService.getLikeEntityByLikedPostIdAndLikedByUserId(likedPostId, likedByUserId);
        return likeService.deleteByLikeEntity(likeEntity);
    }

    // THIS IS TO FIND ALL THE POSTS A USER HAS LIKED
    @GetMapping("/getLikeEntityByUserId")
    public List<LikeEntity> getLikeEntityByUserId(@RequestParam int userId){
        return likeService.getLikeEntityByLikedUserId(userId);
    }
}

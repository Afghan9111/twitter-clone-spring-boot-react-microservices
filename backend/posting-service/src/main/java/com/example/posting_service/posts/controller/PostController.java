package com.example.posting_service.posts.controller;

import com.example.posting_service.posts.entity.NewPostMediaEntity;
import com.example.posting_service.posts.entity.PostEntity;
import com.example.posting_service.posts.entity.PostMediaEntity;
import com.example.posting_service.posts.service.PostMediaService;
import com.example.posting_service.posts.service.PostService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {

    private final PostService postService;
    private final PostMediaService postMediaService;

    public PostController(PostService postService, PostMediaService postMediaService){
        this.postService = postService;
        this.postMediaService = postMediaService;
    }

    @PostMapping("/addPost")
    public PostEntity addPost(@Valid @RequestBody PostEntity postEntity){
        for (PostMediaEntity media : postEntity.getMediaList()) {
            media.setPostEntity(postEntity); // 🔥 Required!
        }
        return postService.addPost(postEntity);
    }

    @PostMapping("/addMedia")
    public PostMediaEntity addMedia(@RequestBody NewPostMediaEntity newPostMediaEntity){

        PostMediaEntity postMediaEntity = new PostMediaEntity();
        postMediaEntity.setPostEntity(newPostMediaEntity.getPostEntity());
        postMediaEntity.setUserId(newPostMediaEntity.getUserId());
        postMediaEntity.setMediaUrl(newPostMediaEntity.getMediaUrl());
        postMediaEntity.setMediaType(newPostMediaEntity.getMediaType());

        return postMediaService.addPostMedia(postMediaEntity);
    }

    // getting user's posts using USER ID
    @GetMapping("/getUsersPosts")
    public List<PostEntity> getUsersPosts(@RequestParam int userId){
        return postService.getUsersPostsDescendingOrder(userId);
    }

    // deleting post by POST ID
    @PostMapping("/deletePost")
    public String deletePost(@RequestParam Long postId){
        return postService.deletePostByPostId(postId);
    }

    @GetMapping("/getPostByPostId")
    public PostEntity getPostByPostId(Long postId){
        return postService.findPostByPostId(postId);
    }

    @GetMapping("/getRepliesToPost")
    public List<PostEntity> getRepliesToPost(@RequestParam Long postId){
        return postService.findRepliedPostsByPostId(postId);
    }
}
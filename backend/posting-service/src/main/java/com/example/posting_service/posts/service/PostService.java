package com.example.posting_service.posts.service;

import com.example.posting_service.posts.entity.PostEntity;
import com.example.posting_service.posts.entity.PostMediaEntity;
import com.example.posting_service.posts.repository.PostRepository;
import com.example.posting_service.posts.repository.PostMediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService{

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostMediaRepository postMediaRepository;

    @Autowired
    private MediaRestClientService mediaRestClientService;

    public PostEntity addPost(PostEntity postEntity) {
        return postRepository.save(postEntity);
    }

    public List<PostEntity> getUsersPosts(int userId) {
        return postRepository.findAllByUserId(userId);
    }

    public List<PostEntity> getUsersPostsAscendingOrder(int userId) {
        return postRepository.findAllByUserIdOrderByCreatedAtAsc(userId);
    }

    public List<PostEntity> getUsersPostsDescendingOrder(int userId) {
        return postRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
    }

    public String deletePostByPostId(Long postId) {
        try {
            List<PostMediaEntity> mediaEntityList = postRepository.findById(postId).get().getMediaList();
            for (PostMediaEntity postMediaEntity: mediaEntityList){
                String mediaUrl = postMediaEntity.getMediaUrl();
                if (mediaUrl.contains("res.cloudinary")){
                    String output = mediaRestClientService.deleteMedia(mediaUrl);
                }
            }
            //postMediaRepository.deleteAll(mediaEntityList);
            postRepository.deleteById(postId);
            return "success";
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return "failure";
        }
    }

    public PostEntity findPostByPostId(Long postId) {
        Optional<PostEntity> result = postRepository.findById(postId);
        return result.orElse(null);
    }

    public List<PostEntity> findRepliedPostsByPostId(Long postId){
        return postRepository.findAllByReplyToPostIdOrderByCreatedAtDesc(postId);
    }
}

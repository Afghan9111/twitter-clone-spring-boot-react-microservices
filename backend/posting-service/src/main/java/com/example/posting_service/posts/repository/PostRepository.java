package com.example.posting_service.posts.repository;

import com.example.posting_service.posts.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {

    List<PostEntity> findAllByUserId(int userId);

    List<PostEntity> findAllByUserIdOrderByCreatedAtAsc(int userId);

    List<PostEntity> findAllByUserIdOrderByCreatedAtDesc(int userId);

    List<PostEntity> findAllByReplyToPostIdOrderByCreatedAtDesc(Long postId);
}

package com.example.connection_service.repository;

import com.example.connection_service.entity.ConnectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConnectionRepository extends JpaRepository<ConnectionEntity, Long> {

    // Get all users that *userId* is following
    List<ConnectionEntity> findAllByFollowerId(int userId);

    // Get all users that are following *userId*
    List<ConnectionEntity> findAllByFolloweeId(int userId);

    Optional<ConnectionEntity> findByFollowerIdAndFolloweeId(int followerId, int followeeId);
}


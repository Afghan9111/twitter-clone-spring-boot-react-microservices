package com.example.connection_service.service;

import com.example.connection_service.entity.ConnectionEntity;
import com.example.connection_service.repository.ConnectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConnectionService {

    @Autowired
    private ConnectionRepository connectionRepository;

    public ConnectionEntity addConnection(ConnectionEntity connectionEntity){
        return connectionRepository.save(connectionEntity);
    }

    public String deleteConnectionByEntity(ConnectionEntity connectionEntity){
        try {
            connectionRepository.delete(connectionEntity);
            return "success";
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return "failure";
        }
    }

    public String deleteConnectionById(long connectionId){
        try {
            connectionRepository.deleteById(connectionId);
            return "success";
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return "failure";
        }
    }

    public List<ConnectionEntity> getFollowersOfAUser(int userId){
        return connectionRepository.findAllByFolloweeId(userId);
    }

    public List<ConnectionEntity> getUsersFollowedByUser(int userId){
        return connectionRepository.findAllByFollowerId(userId);
    }

    public ConnectionEntity findByFollowerAndFolloweeId(int followerId, int followeeId){
        return connectionRepository.findByFollowerIdAndFolloweeId(followerId, followeeId).orElse(null);
    }

    public String deleteConnectionByFollowerAndFolloweeId(int followerId, int followeeId){
        try {
            ConnectionEntity connectionEntity = connectionRepository.findByFollowerIdAndFolloweeId(followerId, followeeId).orElse(null);
            assert connectionEntity != null;
            connectionRepository.delete(connectionEntity);
            return "success";
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return "failure";
        }
    }
}

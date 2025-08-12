package com.example.connection_service.controller;

import com.example.connection_service.dto.FollowerFolloweeDTO;
import com.example.connection_service.entity.ConnectionEntity;
import com.example.connection_service.service.ConnectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/connection")
public class ConnectionController {

    @Autowired
    private ConnectionService connectionService;

    @PostMapping("/addConnection")
    public ConnectionEntity addConnection(@RequestBody ConnectionEntity connectionEntity){
        System.out.println("Saving connection: " + connectionEntity.getFollowerId() + " " + connectionEntity.getFolloweeId());
        return connectionService.addConnection(connectionEntity);
    }

    @PostMapping("/deleteConnectionById")
    public String deleteConnectionById(@RequestParam Long connectionId){
        return connectionService.deleteConnectionById(connectionId);
    }

    @PostMapping("/deleteConnectionByEntity")
    public String deleteConnectionByEntity(@RequestBody ConnectionEntity connectionEntity){
        return connectionService.deleteConnectionByEntity(connectionEntity);
    }

    @GetMapping("/getUserConnections")
    public FollowerFolloweeDTO getUserConnections(@RequestParam int userId){
        FollowerFolloweeDTO dto = new FollowerFolloweeDTO();

        dto.setFolloweeList(connectionService.getUsersFollowedByUser(userId));
        dto.setFollowerList(connectionService.getFollowersOfAUser(userId));

        return dto;
    }

    @PostMapping("/deleteConnectionByFollowerAndFolloweeId")
    public String deleteConnectionByFollowerAndFolloweeId(@RequestParam int followerId, @RequestParam int followeeId){
        return connectionService.deleteConnectionByFollowerAndFolloweeId(followerId, followeeId);
    }

}
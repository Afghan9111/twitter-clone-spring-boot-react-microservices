import { useQuery } from "@tanstack/react-query"
import { getUserByUserId, getUserByUsername } from "../UserService"
import { getPostByPostId, getRepliesToPost, getUsersPost } from "../PostingService";
import { getUsersConnection } from "../ConnectionService";
import { getLikeEntityByUserId, getPostLikesCount } from "../LikeService";
import { getAllBookmarksByUserId, getPostBookmarkCount, getPostsFromBookmarks } from "../BookmarkService";

// GETTING USER INFORMATION FROM THE USERNAME
export const useGetUserInfoFromUsername = (username: string) => {
    return useQuery({
        queryKey: ["users", username],
        queryFn: async () => {
            const result = await getUserByUsername(username);
            if (!result?.data){
                throw new Error("UNABLE TO FETCH USER DETAILS");
            }
            return result;
        }
    })
}

// GETTING USERINFO FROM THE USER ID 
export const useGetUserInfoFromId = (userId: number) => {
    return useQuery({
        queryKey: ["users", userId],
        queryFn: async () => {
            const result = await getUserByUserId(userId);
            if (!result?.data){
                throw new Error("UNABLE TO FETCH USER DETAILS");
            }
            return result;
        }
    })
}

// GETTING ALL THE POSTS OF THE USER BY THEIR USER ID
export const useGetPosts = (userId: number) => {
    return useQuery({
        queryKey: ["posts", userId],
        queryFn: async () => {
            const result =  await getUsersPost(userId);
            if (!result?.data){
                throw new Error("COULD NOT FIND USER POSTS");
            }
            return result;
        },
        staleTime: 0,
        enabled: !!userId
    })
}

// GETTING FOLLOWER FOLLOWING DTO OF THE USER - GET HIS CONNECTIONS 
export const useGetUserConnections = (userId: number) => {
    return useQuery({
        queryKey: ["connections", userId],
        queryFn: async () => {
            const result =  await getUsersConnection(userId);
            if (!result?.data){
                throw new Error("COULD NOT FIND USER POSTS");
            }
            return result;
        },
        staleTime: 0,
        enabled: !!userId
    })
}

// GETTING THE LIKE COUNT OF A POST BY POST ID 
export const useGetPostLikesCount = (postId: number) => {
    return useQuery({
        queryKey: ["post-likes-count", postId],
        queryFn: async () => {
            const result = await getPostLikesCount(postId);
            if (!result?.data){
                throw new Error("COULD NOT FIND POSTS LIKE COUNT");
            }
            return result.data;
        },
        staleTime: 0,
        enabled: !!postId,
    })
}

// GETTING A LIST OF POSTS LIKED BY THE USER
export const useGetPostLikesByUser = (userId: number) => {
    return useQuery({
        queryKey: ["posts-liked-by-user", userId],
        queryFn: async () => {
            const result = await getLikeEntityByUserId(userId);
            if (!result?.data){
                throw new Error("COULD NOT FIND USER POSTS");
            }
            return result;
        },
        staleTime: 0,
        enabled: !!userId
    })
}

// GETTING ALL THE BOOKMARKS OR A LIST OF BOOKMARKS OF A USER
export const useGetUsersBookmarks = (userId: number ) => {
    return useQuery({
        queryKey: ["bookmarks", userId],
        queryFn: async () => {
            const result = await getAllBookmarksByUserId(userId);
            if (!result?.data){
                throw new Error("COULD NOT FIND USER BOOKMARKS");
            }
            return result;
        },
        staleTime: 0,
        enabled: !!userId
    })
}

// GETTING A BOOKMARKS COUNT OF A POST BY POST ID
export const useGetPostBookmarkCount = (postId: number) => {
    return useQuery({
        queryKey: ["bookmarks-count", postId],
        queryFn: async () => {
            const result = await getPostBookmarkCount(postId);
            if (!result?.data){
                throw new Error("COULD NOT FIND POSTS BOOKMARKS COUNT");
            }
            return result;
        },
        staleTime: 0,
        enabled: !!postId
    })
}


export const useGetPost = (postId: number) => {
    return useQuery({
        queryKey: ["post", postId],
        queryFn: async () => {
            const result = await getPostByPostId(postId);
            if (!result?.data){
                throw new Error("COULD NOT FIND POSTS BOOKMARKS COUNT");
            }
            return result.data;
        },
        staleTime: 0,
        enabled: !!postId
    })
}

export const useGetRepliesToPost = (postId: number) => {
    return useQuery({
        queryKey: ["post-replies", postId],
        queryFn: async () => {
            const result = await getRepliesToPost(postId);
            if (!result?.data){
                throw new Error("COULD NOT FIND POSTS BOOKMARKS COUNT");
            }
            return result.data;
        },
        staleTime: 0,
        enabled: !!postId
    })
}


export const useGetBookmarkPosts = (userId: number) => {
    return useQuery({
        queryKey: ["bookmark-posts", userId],
        queryFn: async () => {
            const result = await getPostsFromBookmarks(userId);
            if (!result?.data){
                throw new Error("COULD NOT FIND POSTS");
            }
            return result.data;
        },
        staleTime: 0,
        enabled: !!userId
    })
}
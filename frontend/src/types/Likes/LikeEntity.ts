import type { PostEntity } from "../Posts/PostEntity";

export type LikeEntity = {
    likeId : number;
    likedByUserId: number;
    likedPost : PostEntity;
    likedAt : string;
}
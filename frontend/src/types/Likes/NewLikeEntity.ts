import type { PostEntity } from "../Posts/PostEntity";

export type NewLikeEntity = {
    likedByUserId: number;
    likedPost : PostEntity;
    likedAt : string;
}
import type { PostEntity } from "../Posts/PostEntity";

export type NewBookmarkEntity = {
    bookmarkedPost: PostEntity;
    bookmarkedByUserId: number;
    bookmarkedAt: string;
}
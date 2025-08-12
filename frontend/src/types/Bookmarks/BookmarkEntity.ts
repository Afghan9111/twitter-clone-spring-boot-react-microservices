import type { PostEntity } from "../Posts/PostEntity";

export type BookmarkEntity = {
    bookmarkId: number;
    bookmarkedPost: PostEntity;
    bookmarkedByUserId: number;
    bookmarkedAt: string;
}
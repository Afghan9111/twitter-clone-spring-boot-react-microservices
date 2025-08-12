import type { NewPostMediaEntity, PostMediaEntity } from "./PostMediaEntity";

export type PostType = "ORIGINAL" | "REPLY" | "RETWEET" | "QUOTE";
export type PostVisibility = "PUBLIC" | "PRIVATE" | "FOLLOWERS";

export type PostEntity = {
  postId: number;
  userId: number;
  postText: string | null;
  quotedPostId: number | null;
  replyToPostId: number | null;
  postType: PostType;
  visibility: PostVisibility;
  createdAt: string;  
  updatedAt: string;
  impressions: number;
  mediaList: PostMediaEntity[];
};

export type NewPostEntity = {
  userId: number;
  postText: string | null;
  quotedPostId: number | null;
  replyToPostId: number | null;
  postType: PostType;
  visibility: PostVisibility;
  createdAt: string;  
  updatedAt: string;
  impressions: number;
  mediaList: NewPostMediaEntity[];
};

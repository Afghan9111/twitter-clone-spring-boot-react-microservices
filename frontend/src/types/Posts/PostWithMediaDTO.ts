import type { PostEntity } from "./PostEntity"
import type { PostMediaEntity } from "./PostMediaEntity";

export type PostWithMediaDTO = {
    postEntity: PostEntity;
    mediaList: PostMediaEntity[];
}
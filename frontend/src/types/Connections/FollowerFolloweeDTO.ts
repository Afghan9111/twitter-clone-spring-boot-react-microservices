import type { ConnectionEntity } from "./ConnectionEntity";

export type FollowerFolloweeDTO = {
    followeeList: ConnectionEntity[];
    followerList: ConnectionEntity[];
}
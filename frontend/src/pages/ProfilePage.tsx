import { useEffect, useRef, useState } from "react";
import type { User } from "../types/Users/User";
import { Link, MapPin } from "lucide-react";

import "../styles/pages-styles/ProfilePage.css";
import '../styles/components-styles/EditModal.css';
import { useNavigate, useParams } from "react-router-dom";
import { getUserByUsername,  updateUserProfile } from "../api/UserService";
import { toast } from "react-toastify";
import { uploadMedia } from "../api/MediaService";

import PhotoViewer from '../components/PhotoViewer';

import useOutsideAlerter from "../hooks/useOutsideAlerter";
import { useAuth } from "../context/AuthContext";
import EditProfileModal from "../components/EditProfileModal";
import PostCard from "../components/PostCard";

import {OrbitProgress} from "react-loading-indicators";
import type { PostEntity } from "../types/Posts/PostEntity";
import { useGetPostLikesByUser, useGetPosts, useGetUserConnections, useGetUsersBookmarks } from "../api/query/Queries";
import { extractIdsFromDTO } from "../methods/ExtractUsers";
import type { FollowerFolloweeNumbers } from "../types/Connections/FollowerFolloweeNumbers";
import { FollowUser, UnfollowUser } from "../methods/FollowingMethods";
import LoadingScreen from "./LoadingScreen";


export default function ProfilePage() {
    const {authUser} = useAuth();

    const { username } = useParams<{ username: string }>();
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [editableUserInfo, setEditableUserInfo] = useState<User | null>(null);

    const profilePhotoRef = useRef<HTMLInputElement>(null);
    const backgroundPhotoRef = useRef<HTMLInputElement>(null);
    
    // THIS IS FOR UPLOADING TO CLOUDINARY
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [backgroundPhoto, setBackgroundPhoto] = useState<File | null>(null);
    
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    
    const [showPhotoViewer, setShowPhotoViewer] = useState<boolean>(false);
    const [selectedPhoto, setSelectedPhoto] = useState<string>("");

    const {ref: photoViewerRef} = useOutsideAlerter<HTMLDivElement>(undefined, setSelectedPhoto);


    const userId = userInfo?.id ?? -1;
    const {data: userPostQueryData, isLoading: isUserPostLoading, refetch: refetchPosts}= useGetPosts(userId);

    const {data: userConnectionQueryData, refetch: refetchConnections}= useGetUserConnections(userId);
    const followers = userConnectionQueryData?.data.followerList;
    const followees = userConnectionQueryData?.data.followeeList;

    const dto = userConnectionQueryData?.data;
    const idNumbers: FollowerFolloweeNumbers | null = dto ? extractIdsFromDTO(dto) : null;
    const isFollowing = idNumbers?.follower.includes(authUser?.id ?? -1);


    const userLikedPostResult = useGetPostLikesByUser(authUser?.id!);
    const userBookmarkedPostResult = useGetUsersBookmarks(authUser?.id!);

    const navigate = useNavigate();

    const removeHTTPS = (url: string) => {
        return url.replace("https://","");
    }
    
    useEffect(() => {
        async function fetchProfileUser() {
            if (username) {
                try {
                    const response = await getUserByUsername(username);
                    setUserInfo(response.data);
                } catch (error) {
                    console.error("Error fetching profile user:", error);
                }
            }
        }
        fetchProfileUser();
    }, [username]);
    
        
    useEffect(() => {
        if (userInfo) {
            document.title = `${userInfo.name} (@${userInfo.username})`;
        }
    }, [userInfo]);


    if (!userInfo) {
        return <LoadingScreen text="Loading profile....."/>
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditableUserInfo(prev => {
            if (!prev) return prev;
            return { ...prev, [name]: value };
        });
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!editableUserInfo) return;

        let profilePhotoUrl: string | null = null;
        let backgroundPhotoUrl: string | null = null;

        if (profilePhoto) {
            const profilePhotoResponse = await uploadMedia(profilePhoto);
            if (profilePhotoResponse) {
                profilePhotoUrl = profilePhotoResponse.data;
            }
        }

        if (backgroundPhoto) {
            const backgroundPhotoResponse = await uploadMedia(backgroundPhoto);
            if (backgroundPhotoResponse) {
                backgroundPhotoUrl = backgroundPhotoResponse.data;
            }
        }

        const updatedUserInfo: User = {
            ...editableUserInfo,
            profilePhoto: profilePhotoUrl || editableUserInfo.profilePhoto,
            backgroundPhoto: backgroundPhotoUrl || editableUserInfo.backgroundPhoto,
        };

        setEditableUserInfo(updatedUserInfo);

        const savingUserResponse = await updateUserProfile(updatedUserInfo);
        if (savingUserResponse) {
            setUserInfo(updatedUserInfo); // Update userInfo to reflect changes
            setShowEditModal(false);
            navigate("/home", { replace: true });
            toast("Profile Updated!");
        }
    };

    let numberOfPosts: number;
    if (userPostQueryData?.data) {
        numberOfPosts = userPostQueryData.data.length;
    }
    else {
        numberOfPosts  = 0;
    }

    return (
    
        <div className="profilePostsContainer">
            <div className="profileHeading">
                <p className="userFullName">
                    {userInfo?.name}
                </p>
                <p className="postCount">{numberOfPosts} {numberOfPosts > 1 ? "posts": "post" }</p>
            </div>

            <div>
                <div className="backgroundPhotoContainer">
                    <img src={userInfo?.backgroundPhoto} className="backgroundPhoto" 
                    onClick={()=> {setSelectedPhoto(userInfo?.backgroundPhoto)}}/>
                </div>
                <div className="profilePhotoAndEditProfileContainer">
                    <div className="profilePhotoContainerBig">
                        <img src={userInfo?.profilePhoto} className="profilePhotoBig" 
                        onClick={()=> {setSelectedPhoto(userInfo?.profilePhoto)}}/>
                    </div>
                    {
                        authUser && userInfo.username === authUser.username && (
                            <button className="editButton" onClick={() => {
                                setEditableUserInfo({ ...userInfo });
                                setShowEditModal(true);
                            }}>Edit profile</button>
                        )
                    }
                    {
                        authUser && userInfo.username != authUser.username && (
                            isFollowing ? (
                                <button className="unfollowButton" onClick={ async()=> {
                                    try {
                                        const result = await UnfollowUser(userId, authUser.id);
                                        console.log(result);
                                        toast(`Unfollowed ${username}`);
                                        refetchConnections();
                                    }
                                    catch (error) {
                                        console.log(error);
                                    }
                                }}>Unfollow</button>
                            ) : (
                                <button className="followButton" onClick={async()=> {
                                    try {
                                        const result = await FollowUser(userId, authUser.id);
                                        console.log(result);
                                        toast(`Followed ${username}`);
                                        refetchConnections();
                                    }
                                    catch (error) {
                                        console.log(error);
                                    }
                                }}>Follow</button>
                            )
                        )
                    }
                    
                </div>
                <div className="userInfo">
                    <span className="userFullName">{userInfo?.name}</span>
                    <span className="usernameSpan">@{userInfo?.username}</span>
                    {
                        userInfo.bio !=null && (
                            <p className="bioParagraph">{userInfo.bio}</p>
                        )
                    }
                    
                        
                    <div className="locationWebsiteDateContainer">
                        {userInfo.location !=null && (
                            <div className="locationContainer">
                                <MapPin size={18}/>
                                <span>{userInfo.location}</span>
                            </div>
                        )}
                        {userInfo.website !=null && (
                            <div className="websiteContainer">
                                <Link size={18}/>
                                <a href={userInfo.website}  target="_blank" className="websiteLinkText"><span>{removeHTTPS(userInfo.website)}</span></a>
                            </div>
                        )}

                    </div>
                    
                    <div className="followerContainer">
                        <span 
                            className={followers && followers?.length > 0 ? "highlightText" : ""}
                            onClick={()=> {
                                followers && followers?.length > 0 && navigate(`/${username}/followers`)
                            }}
                            >
                            <span className="followText">{followers?.length ?? 0} </span>
                            {(followers?.length ?? 0) === 1 ? "Follower" : "Followers"}
                        </span>
                        <span 
                            className={followees && followees?.length > 0 ? "highlightText" : ""}
                            onClick={()=> {followees && followees?.length > 0 && navigate(`/${username}/following`)}}
                            >
                            <span className="followText">{followees?.length ?? 0} </span>
                            {(followees?.length ?? 0) === 1 ? "Following" : "Following"}
                        </span>
                    </div>
                </div>
            </div>


            {
                showEditModal && editableUserInfo && (
                    <EditProfileModal
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        editableUserInfo={editableUserInfo}
                        setEditableUserInfo={setEditableUserInfo}
                        profilePhotoRef={profilePhotoRef}
                        backgroundPhotoRef={backgroundPhotoRef}
                        setProfilePhoto={setProfilePhoto}
                        setBackgroundPhoto={setBackgroundPhoto}
                        closeModal={() => {
                            setEditableUserInfo({ ...userInfo! });
                            setShowEditModal(false);
                        }}
                    />
                )
            }

            {
                selectedPhoto !="" && (
                    <PhotoViewer 
                        refer={photoViewerRef}
                        selectedPhoto={selectedPhoto} 
                        setSelectedPhoto={setSelectedPhoto}
                        isVisible={showPhotoViewer}
                        setVisibilty={setShowPhotoViewer}
                    />
                )
            }
            
            <div className="postsContainer">
            <div className="postHeading">Posts</div>
                {
                    isUserPostLoading ? (
                        <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center' }}>
                            <OrbitProgress color="#1DA1F2" size="medium" text="" textColor="" />
                        </div>
                    ) : !userPostQueryData || userPostQueryData.data.length === 0 ? (
                        <div>No posts yet</div>
                    ) : (
                        userPostQueryData.data.map((post: PostEntity, index: number) => (
                            <div key={index}>
                                <PostCard 
                                    userId={userId}
                                    postEntity={post}
                                    refetch={refetchPosts}
                                    userLikedPostsResult={userLikedPostResult} 
                                    userBookmarkedPostsResult={userBookmarkedPostResult}                                    
                                />
                            
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}
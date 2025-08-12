import { ArrowLeft } from "lucide-react";
import "../styles/pages-styles/BookmarksPage.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGetBookmarkPosts, useGetPostLikesByUser, useGetUsersBookmarks } from "../api/query/Queries";
import PostCard from "../components/PostCard";

export default function BookmarksPage() {

    const {authUser} = useAuth();
    const navigate = useNavigate();
    
    const userLikedPostsResult = useGetPostLikesByUser(authUser?.id!);
    const userBookmarkedPostsResult = useGetUsersBookmarks(authUser?.id!);
    const {data: bookmarks} = useGetBookmarkPosts(authUser?.id!);
    
    return (
        <div className="bookmarksPageContainer">
            <div className="bookmarkHeadingContainer">
                <div className="arrowLeftBookmarkViewerHeaderContainer">
                    <ArrowLeft className="arrowLeftBookmarkViewerHeader" size={20}
                        onClick={() => {if (window.history.length > 1) { navigate(-1); } 
                                        else {navigate('/home'); }  }}
                    />
                </div>
                <span className="bookmarkHeaderHeadingSpan">Bookmarks</span>
            </div>
            {
                authUser && bookmarks?.length! > 0 && (
                    bookmarks?.map((bookmarkPost) => (
                        <PostCard userId={authUser.id} 
                        postEntity={bookmarkPost} 
                        userLikedPostsResult={userLikedPostsResult}
                        userBookmarkedPostsResult={userBookmarkedPostsResult} />
                    ))
                )
            }
        </div>
    )
}
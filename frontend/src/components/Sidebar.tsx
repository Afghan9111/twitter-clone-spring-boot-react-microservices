import '../styles/components-styles/Sidebar.css';
import  NavigationItem  from './NavigationItem';
import {Bookmark, Ellipsis, House, LogOut, Settings, User as UserIcon, Bell as NotificationBell} from 'lucide-react';
import PostButton from './PostButton';
import type { User } from '../types/Users/User';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostModal from './PostModal';
import useOutsideAlerter from '../hooks/useOutsideAlerter';
import { TWITTER_LOGO_PATH } from '../constants/PhotoUrls';

type UserInfoProp = {
    userInfo?: User | null;
}


export default function Sidebar({userInfo}: UserInfoProp) {
    const [showDialogBox, setShowDialogBox] = useState<boolean>(false);
    const [showPostModal, setShowPostModal] = useState<boolean>(false);

    const {ref: postModalRef} = useOutsideAlerter<HTMLDivElement>(setShowPostModal, undefined);

    const navigate = useNavigate();
    const location = useLocation();
    
    const logout =() => {
        localStorage.removeItem("authToken");
        navigate("/auth", {replace: true});
        toast("Logout successful!");
    }

    return (
        <header className='sidebarContainer'>
            <div className='sidebar'>
                <img src={TWITTER_LOGO_PATH} className='appLogoSmall' alt='Twitter Logo'/>
                <div className='navigationItemContainer'>
                    <NavigationItem navigationItem={{
                        title: "Home",
                        icon: <House />,
                        url: "/home"
                    }} 
                    isActive={location.pathname === "/home"}
                    />
                    <NavigationItem navigationItem={{
                        title: "Profile",
                        icon: <UserIcon />,
                        url: `/${userInfo?.username}`
                    }} 
                    isActive={location.pathname === `/${userInfo?.username}`}
                    />

                    <NavigationItem navigationItem={{
                        title: "Bookmarks",
                        icon: <Bookmark />,
                        url: '/bookmarks'
                    }} 
                    isActive={location.pathname === '/bookmarks'}
                    />

                    <NavigationItem navigationItem={{
                        title: "Notifications",
                        icon: <NotificationBell />,
                        url: '/notifications'
                    }} 
                    isActive={location.pathname === '/notifications'}
                    />
                    
                    <NavigationItem navigationItem={{
                        title: "Settings",
                        icon: <Settings />,
                        url: '/settings'
                    }} 
                    isActive={location.pathname === '/settings'}
                    />

                    
                    <PostButton value={showPostModal} setValue={setShowPostModal}/>

                    <div className='sidebarProfileContainer' onClick={()=> {setShowDialogBox(!showDialogBox)}}>
                        <div className='sidebarProfilePhotoUsernameContainer'>
                            <div className='sidebarProfilePhotoContainer'>
                                <img src={userInfo?.profilePhoto} className='sidebarProfilePhoto'/> 
                            </div>
                            <div className='sidebarUsernameFullNameContainer'>
                                <span className='sidebarUserFullName'>{userInfo?.name}</span>
                                <span >@{userInfo?.username}</span>
                            </div>
                        </div>
                        <div>
                            <Ellipsis />
                        </div>

                    </div>
                    
                    {
                        showDialogBox && 
                        <div className='sidebarDialogBox'>
                            <div className='sidebarLogoutBox' onClick={()=> logout()}>
                                <LogOut/> Logout 
                            </div>
                        </div>
                    }
                </div>
            </div>
            {
                userInfo && showPostModal && (
                    <PostModal userInfo={userInfo} 
                        isVisible={showPostModal}
                        setIsVisible={setShowPostModal}
                        refer={postModalRef}
                    />
                )
            }
        </header>
    )
}

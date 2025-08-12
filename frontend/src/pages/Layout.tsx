import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import  SearchField  from "../components/SearchField";

import '../styles/pages-styles/layout-styles/layout.css';
import '../styles/pages-styles/layout-styles/RightContentContainer.css';

import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const {authUser}= useAuth();
    
  return (
    <div className="homeContainer">
      <Sidebar userInfo={authUser}/>
      <main className="middleContentContainer">
        <Outlet /> 
      </main>
      <div className="rightContentContainer">
        <SearchField />
      </div>
    </div>
  );
}
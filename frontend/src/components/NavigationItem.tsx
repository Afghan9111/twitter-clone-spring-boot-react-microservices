import '../styles/components-styles/Sidebar.css';
import type { NavigationItem } from "../types/NavigationItem";
import { useNavigate } from "react-router-dom";

type NavigationItemProp = {
    navigationItem: NavigationItem;
    isActive: boolean;
}
export default function NavigationItem( {navigationItem, isActive}: NavigationItemProp) {
    const navigate = useNavigate();

    return (
        <div className={`navigationItem ${isActive ? "active" : ""}`} onClick={()=> {navigate(navigationItem.url)}}>
            {navigationItem.icon}
            <p>{navigationItem.title}</p>
        </div>
    )
}
import { useEffect } from "react";

export default function SettingsPage () {
    
    useEffect(() => {document.title = "Settings"}, []);
    
    return (
        <div>
            settings page.
        </div>
    )
}
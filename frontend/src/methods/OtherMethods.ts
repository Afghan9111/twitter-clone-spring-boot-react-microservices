export const getVideoFormat = (videoUrl: string) => {
    return ( "video/" + videoUrl.split(".").at(-1))
}

export function leadUserToProfilePage(navigate:(username: string)=>void, username: string){
    navigate(`/${username}`);
}   

export function parseDate(dateISO: string): string {
    const date = new Date(dateISO);

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    };

    const timeStr = date.toLocaleTimeString('en-US', timeOptions); // e.g., "3:09 PM"
    const dateStr = date.toLocaleDateString('en-US', dateOptions); // e.g., "Aug 2, 2025"

    return `${timeStr} · ${dateStr}`;
}

import type { ReactNode } from "react";

export type NavigationItem = {
    title: string;
    onClickAction?: () => void;
    icon: ReactNode;
    url: string;
}
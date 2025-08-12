import type { GenreItem } from "../types/GenreItem"
import '../styles/components-styles/GenreItem.css';

type GenreItemProp = {
    genreItem: GenreItem;
}

export default function GenreItem({genreItem}: GenreItemProp) {
    return (
        <div className="genreItem">
            {genreItem.title}
        </div>
    )
}
import "../styles/components-styles/PostButton.css";

type ButtonProp = {
    value:boolean;
    setValue:(value: boolean)=> void;
}

export default function PostButton({value, setValue}: ButtonProp) {
    
    return (
        <div className="postButtonContainer">
            <button className="postButton" onClick={()=> {setValue(!value)}}>Post</button>
        </div>
    );
}
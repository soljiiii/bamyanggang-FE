import { useState } from "react";
import "./Input.css";

function Input ({type, name, placeholder}) {

    const [feedback, setFeedback] = useState("");
    function onFeedBack (e) {
        setFeedback()
    }

    return(
        <input 
            className={type}
            name ={name}
            placeholder={placeholder}
            onChange={onChangeWrite}
            value={write}
        />
    );
}

export default Input;
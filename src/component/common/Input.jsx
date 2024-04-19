import { useState } from "react";
import "./Input.css";

function Input ({type, name, placeholder}) {

    const [write,setWrite] = useState("");
    function onChangeWrite (e) {
        setWrite(e.target.value);
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
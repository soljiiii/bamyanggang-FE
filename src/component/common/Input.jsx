import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import "./Input.css";

function Input ({type, name, placeholder, onChange, value}) {

    function handleChange(event) {
        const newValue = event.target.value;
        onChange(newValue);
    }

    return(
        <div className="inputContainer">
                <input 
                    className={type}
                    name ={name}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value}
                />
                {value && (
                    <FaTimes 
                        className="clearIcon" 
                        onClick={()=>onChange("")}  
                    />
                )}
        </div>
    );
}

export default Input;

import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";


const LoginCheck=(props)=>{

    const [cookie, setCookie, removeCookie] =useCookies(['id']);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    //페이지에 들어올 때 쿠키 체크
    const authCheck=()=>{
        const token = cookie.id; //쿠키에서 id 꺼내기

        axios.post('api',{token : token})
        .then((response)=>{
            setUserId(response.data.id);
        })
        .catch(()=>{
            alert("재로그인 필요");
            logOut();
        })
    }
}

const logOut=()=>{
    removeCookie('id');
    navigate('/login');
}
export default LoginCheck;
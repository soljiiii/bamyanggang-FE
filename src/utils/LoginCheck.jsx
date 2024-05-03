import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

function LoginCheck(){
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['refreshToken']);
    const [userId, setUserId] = useState('');

    const accessToken = localStorage.getItem('accessToken');

    useEffect(()=>{
        if(accessToken){
            //token의 내용을 decoding 
            const decodedToken = jwtDecode(accessToken);
            //decoding한 token에서 만료시간을 expTime에 저장
            const expTime = decodedToken.exp;
            //현재 시간 (초 단위)
            const curTime = Math.floor(Date.now() / 1000);

            if(expTime < curTime) {
                //accesstoken의 만료되었을 때 refreshtoken으로 재발급 받기
                const refreshToken = cookies.refreshToken;
                if(refreshToken){
                axios.post('재발급',{refreshToken})
                    .then(response =>{
                        const newAccessToken = response.data.access;
                        localStorage.setItem('accessToken', newAccessToken);
                        //재발급 받고 id값 추출
                        const {username} = decodedToken;
                        setUserId(username);

                        //재발급한 후 이전 페이지로 이동
                        navigate(-1);

                    })
                    .catch(error=>{
                        console.error('토큰 재발급 요청 실패:', error);
                        //재발급 요청 실패 시 로그인 페이지로 이동
                        navigate('/login');
                    })
                }
                //refreshToken이 없을 때
                else{
                    console.log('RefreshToken이 없습니다.');
                    navigate('/login');
                }

            }else{
                //만료시간이 남아있다면 이전 페이지로 이동
                const {username} = decodedToken;
                setUserId(username);
                navigate(-1);
            }
        }else{
            console.log('AccessToken이 없습니다.');
            navigate('/login');
        }
    }, [cookies.refreshToken, navigate, accessToken]);

    return null; //화면에 보이지 않는 컴포넌트

}
export default LoginCheck;
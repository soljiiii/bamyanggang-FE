import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Header(){
    // const [cookies, setCookie] = useCookiesCookies(['refreshToken']);
    // const accessToken = localStorage.getItem('accessToken');

    const [cookies, setCookie] = useCookies(['refreshToken']);

    const accessToken = localStorage.getItem('accessToken');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        //accessToken이 있다면
        if(accessToken){
            const decodedToken = jwtDecode(accessToken);
            const expTime = decodedToken.exp;
            const curTime = Math.floor(Date.now()/1000);
            if(expTime < curTime){
                //accessToken이 만료되었을 때 refreshToken으로 재발급 받기
                const refreshToken = cookies. refreshToken;
                if(refreshToken){
                    //재발급 api에 refreshtoken이 담겨져있는 쿠키를 전달
                    axios.post('재발급api',{refreshToken})
                    .then(response=>{
                        const newAccessToken = response.data.access;
                        localStorage.setItem('accessToken', newAccessToken);
                        //재발급 한 후, 로그인 된 header로 변경
                        setIsLoggedIn(true);
                    })
                    .catch(error=>{
                        console.error('토큰 재발급 요청 실패:', error);
                        //재발급 실패 -> 로그인 xx헤더
                        setIsLoggedIn(false);
                    })
                }else{
                    console.log('RefreshToken이 없습니다.');
                    setIsLoggedIn(false);
                }
            }else{
                //로그인 xx 헤더
                console.log('AccessToken이 없습니다.');
                setIsLoggedIn(false);
            }
        }
    }, [cookies.refreshToken, accessToken])

        return(
            <div>
                <div className="headerArea">
                    <div className="headerLeft">
                        <div className="MainButton">
                            <Link to="/"><img src="/images-jsx/밤양갱_white.svg" className="mainImage" alt="Main" /></Link>
                        </div>
                    </div>

                    <div className="headerRight">
                        <div className="loginArea">
                            {isLoggedIn ? (
                                <Link to="/myPage" className="loginButton">myPage</Link>,
                                <Link to="/login" className="loginButton">LOGIN</Link>
                            ) : (
                                <Link to="/login" className="loginButton">LOGIN</Link>
                            )}
                        </div>

                        <div className="startArea">
                            <Link to="/gameSearch" className="mainStartButton">PLAY NOW</Link>
                        </div>
                    </div>
                </div>

                <div className="nav">
                    <ul className="navMenu">
                        <li className="navItem">
                            <div>
                                <Link to="/guide" className="navLink">게임가이드</Link>
                            </div>
                        </li>

                        <li className="navItem">
                            <div >
                                <Link to="/community" className="navLink">커뮤니티</Link>
                            </div>
                        </li>

                        <li className="navItem">
                            <div>
                                <Link to="/notice" className="navLink">공지사항</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
        )
}

export default Header;
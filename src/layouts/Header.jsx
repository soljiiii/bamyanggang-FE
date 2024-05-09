import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import { jwtDecode } from "jwt-decode";

function Header(){
    // const [cookies, setCookie] = useCookiesCookies(['refreshToken']);
    // const accessToken = localStorage.getItem('accessToken');

    const accessToken = localStorage.getItem('access');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{

        if(accessToken){

            const decodedToken = jwtDecode(accessToken);
            const expTime = decodedToken.exp;
            const curTime = Math.floor(Date.now()/1000);
            //만료시간이 남아있을 때 = accessToken 있을 때
            if(expTime > curTime){
                setIsLoggedIn(true);

            }else{
                setIsLoggedIn(false);
            }

        }else{
            //로그인을 하지 않았을 때
            setIsLoggedIn(false);
        }
    
    }, [accessToken]);

    

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
                                <div>
                                <Link to="/myPage" className="myPageButton">MyPage</Link>
                                <Link to="/login" className="logoutButton">LOGOUT</Link>
                                </div>
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

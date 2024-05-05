import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Header(){
    // const [cookies, setCookie] = useCookiesCookies(['refreshToken']);
    // const accessToken = localStorage.getItem('accessToken');

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['refreshToken']);
    const [userId, setUserId] = useState('');

    const accessToken = localStorage.getItem('accessToken');

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
                            return(
                                <div>
                                    <div className="headerArea">
                                        <div className="headerLeft">
                                            <div className="MainButton">
                                                <Link to="/"><img src="/images-jsx/밤양갱_white.svg" className="mainImage"/></Link>
                                            </div>
                                        </div>

                                        <div className="headerRight">
                                            <div className="loginArea">
                                                <Link to="/myPage" className="loginButton">myPage</Link>
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
                        })
                        .catch(error=>{
                            console.error('토큰 재발급 요청 실패:', error);
                            //재발급 실패 -> 로그인 xx헤더
                            return(
                                <div>
                                    <div className="headerArea">
                                        <div className="headerLeft">
                                            <div className="MainButton">
                                                <Link to="/"><img src="/images-jsx/밤양갱_white.svg" className="mainImage"/></Link>
                                            </div>
                                        </div>

                                        <div className="headerRight">
                                            <div className="loginArea">
                                                <Link to="/login" className="loginButton">LOGIN</Link>
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
                        })
                }
                //refreshToken이 없을 때 = 로그인xx헤더
                else{
                    console.log('RefreshToken이 없습니다.');
                    return(
                        <div>
                            <div className="headerArea">
                                <div className="headerLeft">
                                    <div className="MainButton">
                                        <Link to="/"><img src="/images-jsx/밤양갱_white.svg" className="mainImage"/></Link>
                                    </div>
                                </div>

                                <div className="headerRight">
                                    <div className="loginArea">
                                        <Link to="/login" className="loginButton">LOGIN</Link>
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

            }else{
                //만료시간이 남아있을 때 = 로그인 유지 
                return(
                    <div>
                        <div className="headerArea">
                            <div className="headerLeft">
                                <div className="MainButton">
                                    <Link to="/"><img src="/images-jsx/밤양갱_white.svg" className="mainImage"/></Link>
                                </div>
                            </div>

                            <div className="headerRight">
                                <div className="loginArea">
                                    <Link to="/myPage" className="loginButton">myPage</Link>
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
        }else{
            console.log('AccessToken이 없습니다.');
            //로그인 xx 헤더
            return(
                <div>
                    <div className="headerArea">
                        <div className="headerLeft">
                            <div className="MainButton">
                                <Link to="/"><img src="/images-jsx/밤양갱_white.svg" className="mainImage"/></Link>
                            </div>
                        </div>

                        <div className="headerRight">
                            <div className="loginArea">
                                <Link to="/login" className="loginButton">LOGIN</Link>
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
    },[cookies.refreshToken, navigate, accessToken]);

 return(
    
    <div>
        <div className="headerArea">
            <div className="headerLeft">
                <div className="MainButton">
                    <Link to="/"><img src="/images-jsx/밤양갱_white.svg" className="mainImage"/></Link>
                </div>
            </div>

            <div className="headerRight">
                <div className="loginArea">
                    <Link to="/login" className="loginButton">LOGIN</Link>
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

};

export default Header;
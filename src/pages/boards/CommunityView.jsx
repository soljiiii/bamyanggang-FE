import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Header from "../../layouts/Header";
import SubBanner from "../../layouts/SubBanner";
import axios from "axios";
import ReplyList from "../../component/boards/ReplyList";
import ReplyWrite from "../../component/boards/ReplyWrite";
import Button from "../../component/common/Button";
import { jwtDecode } from "jwt-decode";

function CommunityView(){

    const navigate = useNavigate();

    //url parameter 값으로 사용할 변수 설정
    const {postNo,} = useParams();
    const [selectedCommunity, setSelectedCommunity] = useState([]);

     const [prevCommunity, setPrevCommunity] = useState([]);

     const [nextCommunity, setNextCommunity] = useState([]);

    //로그인 상태 확인
    const accessToken = localStorage.getItem('access');
    const [isPluggedIn, setIsPluggedIn] = useState(false);
    const [myId,setMyId] = useState("");
    
    //이전 글, 다음 글
    const [prevPostNo,setPrePostNo] =useState();
    const [nextPostNo, setNextPostNo] = useState();

    //userIdToken에서 parsing한 id
     const userIdToken = JSON.parse(localStorage.getItem('user')).userId;

    useEffect(()=>{

        
        //현재글 데이터
        axios.get(`community/communitycontent/${postNo}`)
            .then((response)=>{
                setSelectedCommunity(response.data);
                setMyId(response.data.userId);
                setPrePostNo(response.data.prevPostNo);
                setNextPostNo(response.data.nextPostNo);
            })
            .catch(error=>{
            console.error("데이터 에러", error);

            })

        }, [postNo]);

    useEffect(()=>{
                   //이전글 데이터 받기
            axios.get(`http://localhost:80/api/community/communitycontent/${prevPostNo}`)
                .then((response)=>{
                    if(response.data===0){
                        setPrevCommunity(null);
                    }else{
                        setPrevCommunity(response.data);
                    }
                })
                    .catch(error=>{
                        console.error("데이터 에러", error);
                })

                            //다음글 데이터
            axios.get(`http://localhost:80/api/community/communitycontent/${nextPostNo}`)
                .then((response)=>{
                    if(response===0){
                        setNextCommunity('');
                    }else{
                        setNextCommunity(response.data);

                    }
                })

                .catch(error=>{
                    console.error("데이터 에러", error);
                })
        
    },[postNo,selectedCommunity]);

    useEffect(()=>{
        if(accessToken){

            const decodedToken = jwtDecode(accessToken);
            const expTime = decodedToken.exp;
            const curTime = Math.floor(Date.now()/1000);

            if(expTime > curTime){
                if(myId===userIdToken){
                    setIsPluggedIn(true);
                } else{
                    setIsPluggedIn(false);
                }
            }
            else{
                setIsPluggedIn(false);
            }
        }else{
            //로그인을 하지 않았을 때
            setIsPluggedIn(false);
        }
                        
    },[selectedCommunity])

    //데이터 삭제
    const deletePost=useCallback(()=>{
        axios.delete(`http://localhost:80/api/community/communitydelete/${postNo}`)
        . then((response)=>{

            if(response.data === 1){
                //성공적으로 삭제
                alert("삭제되었습니다.");
                navigate(`/community`);

            } else{
                //삭제할 게시물이 없음
                console.log("삭제할 게시물이 없습니다.");
            }
        })

        .catch(error=>{
            console.error("데이터 에러", error);
        })
    },[navigate, postNo]);

    return(
        <div>
            <Header />
            <SubBanner />
            <div className="communityList">
                <h1>커뮤니티</h1>
                <br/>
                <br/>
                <div className="communityTotal">
                    <div className="communityViewHead">
                        <div className="communityViewTitleArea">
                            <div className="communityViewTitle">
                                {selectedCommunity.title}
                            </div>

                            {isPluggedIn ? (
                            <div className="requestArea"> 
                                <div className="modifyButton">
                                    <Button 
                                    text={"수정"}
                                    type={"communityButton"}
                                    onClick={()=>{
                                        navigate(`/community/post-modify/${postNo}`);
                                    }}
                                    />
                                </div>
                                <div className="deleteButton">
                                    <Button 
                                    text={"삭제"}
                                    type={"communityButton"}
                                    onClick={()=>deletePost()}
                                    />
                                </div>
                            </div> 
                            ) : (<></>)
                            }
                        </div>

                        <div className="communityViewInfo">
                            <div className="communityViewInfoLeft">
                                {selectedCommunity.userId}
                            </div>

                            <div className="communityViewInfoRight">
                                <div className="communityViewVwCnt">
                                   view : {selectedCommunity.vwCnt}
                                </div>

                                <div className="communityViewWrtnDate">
                                  작성일 : {selectedCommunity.wrtnDate}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="communityViewContent">
                        {selectedCommunity.content && selectedCommunity.content.split("\n").map((line)=>{
                            return(
                                <span>
                                    {line}
                                    <br/>
                                </span>
                            )
                        })}
                    </div>
                    
                    <div className="replyArea">
                        <ReplyList 
                        selectedCommunity={selectedCommunity}
                        />
                    </div>
                    
                    <div>
                        <ReplyWrite 
                        postNo={postNo}
                        />
                    </div>

                    <div className="navCommunity">

                        {selectedCommunity && selectedCommunity.nextPostNo!==0 ? (
                            <div className="nextCommunity" onClick={()=> navigate(`/community/${nextCommunity.postNo}`)}>
                                <div className="nextMenu">다음글</div>
                                <div className="nextTitle"> {nextCommunity.title}</div>
                                <div className="nextDate">{nextCommunity.wrtnDate}</div>
                            </div>
                        ):(
                            <div className="nonNextCommunity">
                                다음글이 없습니다.
                            </div>
                        )}

                        {selectedCommunity && selectedCommunity.prevPostNo !==0 ? (
                            <div className="prevCommunity" onClick={()=> navigate(`/community/${prevCommunity.postNo}`)}>
                                <div className="prevMenu">이전글</div>
                                <div className="prevTitle"> {prevCommunity.title}</div>
                                <div className="prevDate">{prevCommunity.wrtnDate}</div>
                            </div>
                        ):(
                            <div className="nonPrevCommunity">
                                이전글이 없습니다.
                            </div>
                        )}


                    </div>


                </div>
            </div>
        </div>
    )
    
}

export default CommunityView;

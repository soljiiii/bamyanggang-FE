import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router";

import Header from "../../layouts/Header";
import SubBanner from "../../layouts/SubBanner";

function NoticeView(props){
    const {postNo} = useParams();
    const [selectedNotice, setSelectedNotice] = useState([]);
    
    const [prevNotice, setPrevNotice] = useState([]);
    const [nextNotice, setNextNotice] = useState([]);

    const [prevNoticeNo, setPrevNoticeNo] = useState();
    const [nextNoticeNo, setNextNoticeNo] = useState();

    const navigate = useNavigate();



    //현재 noticeView 컨텐츠 출력
   useEffect(()=>{
        
        axios.get(`http://localhost:80/api/notice/noticecontent/${postNo}`)
        //noticelist에서 클릭한 데이터의 postNo을 저장하여, postNo가 일치한 notice데이터를 출력
        //notice 데이터를 setSelectedNotice에 저장
            .then((response) =>{
                setSelectedNotice(response.data.notice);
                setPrevNoticeNo(response.data.notice.prevPostNo);
                setNextNoticeNo(response.data.notice.nextPostNo);
                })
                
            .catch(error => {
                console.error("데이터 에러", error);
            });

   },[postNo]);


    useEffect(()=>{
                   //이전글 데이터 받기
            axios.get(`http://localhost:80/api/notice/noticecontent/${prevNoticeNo}`)
                .then((response)=>{
                    if(response ===0){

                        setPrevNotice(null);
                    }else{
                        setPrevNotice(response.data.notice);
                    }
                })
                    .catch(error=>{
                        console.error("데이터 에러", error);
                })

                            //다음글 데이터
            axios.get(`http://localhost:80/api/notice/noticecontent/${nextNoticeNo}`)
                .then((response)=>{
                    if(response ===0){
                        setNextNotice(null);
                    }else{
                        setNextNotice(response.data.notice);
                    }
                })

                .catch(error=>{
                    console.error("데이터 에러", error);
                })

     },[postNo,selectedNotice]);
     
    return(
        <div>
            <Header />
            <SubBanner />
            <div className="noticeList">
                <h1>공지사항</h1>
                <br/>
                <br/>
                <div className="noticeTotal">
                    <div className="noticeViewHead">
                        <div className="noticeViewTitle">
                            {selectedNotice.title}
                        </div>

                        <div className="noticeViewInfo">
                            <div className="noticeViewVwCnt">
                                view : {selectedNotice.vwCnt}
                            </div>
                            
                            <div className="noticeViewWrtnDate">
                               작성일 : {selectedNotice.wrtnDate}
                            </div>
                        </div>
                    </div>

                    <div className="noticeViewContent"> 
                        {selectedNotice.content && selectedNotice.content.split("\n").map((line)=>{
                            return(
                                <span>
                                    {line}
                                    <br/>
                                </span>
                            )

                        })}
                    </div>

                    <div className="navNotice">
                        {selectedNotice && selectedNotice.nextPostNo !==0 ? (
                                <div className="nextNotice" onClick={()=> navigate(`/notice/${nextNotice.postNo}`)}>
                                    <div>다음글 : {nextNotice.title}</div>
                                    <div>{nextNotice.wrtnDate}</div>
                                </div>
                            ):(
                                <div className="nonNextNotice">
                                    다음글 : 다음글이 없습니다.
                                </div>
                            )}

                        {selectedNotice&& selectedNotice.prevPostNo!==0? (
                            <div className="prevNotice" onClick={()=> navigate(`/notice/${prevNotice.postNo}`)}>
                                <div>이전글 : {prevNotice.title}</div>
                                <div>{prevNotice.wrtnDate}</div>
                            </div>
                        ):(
                            <div className="nonPrevNotice">
                                이전글 : 이전글이 없습니다.
                            </div>
                        )}


                    </div>

                </div>
               
                
                
            </div>
        </div>
    )
}

export default NoticeView;
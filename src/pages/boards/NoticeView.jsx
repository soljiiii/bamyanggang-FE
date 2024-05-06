import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router";

import Header from "../../layouts/Header";
import SubBanner from "../../layouts/SubBanner";

function NoticeView(props){
    const {postNo} = useParams();
    const [selectedNotice, setSelectedNotice] = useState([]);
    
    const prevPostNo = parseInt(postNo)-1;
    const [prevNotice, setPrevNotice] = useState([]);

    const nextPostNo = parseInt(postNo)+1;
    const [nextNotice, setNextNotice] = useState([]);

    const navigate = useNavigate();

    //이전 noticeView 컨텐츠 출력
    //prevPostNo가 0일때는 axios 실행되지 않는다.
    useEffect(()=>{
            axios.get(`http://localhost://notice/noticecontent/?postNo=${prevPostNo}`)

            //noticelist에서 클릭한 데이터의 postNo을 저장하여, postNo가 일치한 notice데이터를 출력
            //notice 데이터를 setSelectedNotice에 저장
                .then((response) =>{
                    if(response.data.length > 0){
                        setPrevNotice(response.data[0]);
                    }else{
                        setPrevNotice(null);
                    }
             
                })

                .catch(error => {
                    console.error("데이터 에러", error);
                });
    },[prevPostNo]);

    //현재 noticeView 컨텐츠 출력
   useEffect(()=>{
        
        axios.get(`http://localhost://notice/noticecontent/?postNo=${postNo}`)
        //noticelist에서 클릭한 데이터의 postNo을 저장하여, postNo가 일치한 notice데이터를 출력
        //notice 데이터를 setSelectedNotice에 저장
            .then((response) =>{
                setSelectedNotice(response.data[0]);
                })
                
            .catch(error => {
                console.error("데이터 에러", error);
            });

   },[postNo]);

   //다음 noticeView 컨텐츠 출력
   //nextPostNo으로 데이터를 요청했을 때 데이터가 있으면 NextNotice에 저장, 없으면 null
   useEffect(()=>{
    axios.get(`localhost://notice/noticecontent/?postNo=${nextPostNo}`)
        .then((response)=>{

            if(response.data.length > 0){
                setNextNotice(response.data[0]);
            }else{
                setNextNotice(null);
            }
        })
   },[nextPostNo]);

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
                        {prevNotice&& prevNotice.title ? (
                            <div className="prevNotice" onClick={()=> navigate(`/notice/${prevNotice.postNo}`)}>
                                <div>이전글 : {prevNotice.title}</div>
                                <div>{prevNotice.wrtnDate}</div>
                            </div>
                        ):(
                            <div className="nonPrevNotice">
                                이전글 : 이전글이 없습니다.
                            </div>
                        )}

                        {nextNotice&& nextNotice.title ? (
                            <div className="nextNotice" onClick={()=> navigate(`/notice/${nextNotice.postNo}`)}>
                                <div>다음글 : {nextNotice.title}</div>
                                <div>{nextNotice.wrtnDate}</div>
                            </div>
                        ):(
                            <div className="nonNextNotice">
                                다음글 : 다음글이 없습니다.
                            </div>
                        )}
                    </div>

                </div>
               
                
                
            </div>
        </div>
    )
}

export default NoticeView;
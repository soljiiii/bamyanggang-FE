import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Header from "../../layouts/Header";
import SubBanner from "../../layouts/SubBanner";

function NoticeView(){
    const {postNo} = useParams();
    const [selectedNotice, setSelectedNotice] = useState([]);
    
    console.log("postNo:", {postNo});
    
   useEffect(()=>{
        
        axios.get(`http://localhost:3001/notice?postNo=${postNo}`)
        //noticelist에서 클릭한 데이터의 postNo을 저장하여, postNo가 일치한 notice데이터를 출력
        //notice 데이터를 setSelectedNotice에 저장
            .then((response) =>{
                setSelectedNotice(response.data[0]);
                })
                
            .catch(error => {
                console.error("데이터 에러", error);
            });

   },[]);
        
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
                                    {selectedNotice.vwCnt}
                            </div>
                            
                            <div className="noticeViewWrtnDate">
                                {selectedNotice.wrtnDate}
                            </div>
                        </div>
                    </div>

                    <div className="noticeViewContent"> 
                        {selectedNotice.content}
                    </div>
                </div>
               
                
                
            </div>
        </div>
    )
}

export default NoticeView;
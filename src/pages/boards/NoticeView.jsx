import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function NoticeView(){
    const {postNo} = useParams();
    const [selectedNotice, setSelectedNotice] = useState([]);
    
    console.log("postNo:", {postNo});
    
   useEffect(()=>{
        
        axios.get(`http://localhost:3001/notice?postNo=${postNo}`)
            .then((response) =>{
                setSelectedNotice(response.data[0]);
       //         console.log(response.data);
                console.log(response.data[0]);
        //        console.log(response.data.notice[0]);
                })
                
            .catch(error => {
                console.error("데이터 에러", error);
            });

   },[]);
        
    return(
        <div>
            <h1>리액트</h1>
            {selectedNotice.title}
        </div>
    )
}

export default NoticeView;
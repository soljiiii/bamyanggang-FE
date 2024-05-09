import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../common/Button";
import axios from "axios";

function ReplyWrite(props){
    const {postNo} = props;

    const navigate = useNavigate();

    const [content, setContent] = useState('');

    //userIdToken에서 parsing한 id
    const userIdToken = JSON.parse(localStorage.getItem('user')).userId;
    

     //댓글 insert함수
       const replyInsert=()=>{
        const data = {
            'userId' : userIdToken,
            'content' : content,
            'postNo' : postNo
        }
           if(content===''){
               alert('댓글을 입력해주세요');
               return;
           }
                if(content.length >200){
               alert('댓글은 200자 이내로 입력해주세요');
               return;
           }
                //댓글 추가
           alert('댓글 추가');
           
           axios.post(`http://localhost:80/api/reply/replywrite`, data)
               .then(function(response){
                
                //새로고침
                window.location.reload();

           }).catch(function(error){
                console.log("error", error);
           })
                   
       }

       return(
        <div className="replyWriteArea">
                <textarea className="replyWrite"
                    value={content}
                    onChange={(event)=>{
                        setContent(event.target.value);
                    }}
                />

            <div className="replyWriteButton">
                <Button
                text={"등록"}
                type={"replyButton"}
                onClick={()=>replyInsert()}
                />
            </div>
        </div>
       )
}
export default ReplyWrite;
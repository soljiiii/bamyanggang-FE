import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../common/Button";
import axios from "axios";

function ReplyWrite(props){
    const {postNo} = props;

    const navigate = useNavigate();

    const [replyNo, setReplyNo] =useState();
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    //날짜 출력
    // const date = new Date();
    // let year = date.getFullYear();
    // let month = (date.getMonth())+1;
    //     month = month >=10 ? month : '0'+month;
    // let day = date.getDate();
    //     day = day >=10 ? day : '0'+day;

    //날짜 커스텀
    // const formatDate = year+('-')+month+('-')+day;

     //댓글 insert함수
       const replyInsert=()=>{
        const data = {
            userId : userId,
            content : content,
            postNo : postNo
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
           
           axios.post(`localhost://reply/replywrite`, data)
               .then(function(response){
                console.log(response.data)
                navigate(`/community/${postNo}`);

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
import React, { useCallback, useEffect, useState } from "react";
import Button from "../../component/common/Button";
import axios from "axios";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

function ReplyListItem(props){
    const {comment, postNo, replyNo, userId} =props;
    const [mode, setMode] = useState(false);
    const navigate = useNavigate();

    //수정 버튼을 눌렀을 때 textarea에 나타나는 comment
    const [content, setContent] = useState(comment.content);

    //로그인 상태 확인
    const accessToken = localStorage.getItem('access');
    const [isPluggedIn, setIsPluggedIn] = useState(false);

    //userIdToken에서 parsing한 id
    const userIdToken = JSON.parse(localStorage.getItem('user')).userId;

    //댓글 수정 함수
    const replyModify=()=>{

           if(content===''){
               alert('댓글을 입력해주세요');
               return;
           }
                if(content.length >200){
               alert('댓글은 200자 이내로 입력해주세요');
               return;
           }
            //댓글 추가
           alert('댓글 수정');
           
            axios.post(`http://localhost:80/reply/replyupdate/${postNo}/${replyNo}`,{
                'postNo' : postNo,
                'replyNo' : replyNo,
                'content' : content
            })
               .then((response)=>{
                console.log(response.data);

                //새로고침
                window.location.reload();
           })

            .catch(error=>{
                console.error("데이터 에러",error);
            })
       }
    
    //댓글 삭제
    const replyDelete=useCallback(()=>{
        axios.delete(`http://localhost:80/reply/replydelete/${replyNo}`)
        .then((response)=>{

            if(response.data ===1){
                //성공적으로 삭제
                console.log("삭제되었습니다.");
                alert("삭제되었습니다.");

                //새로고침
                window.location.reload();

            }else{
                console.log("삭제할 댓글이 없습니다.");
            }
        })
        .catch(error=>{
            console.error("데이터 에러",error);
        })
    },[replyNo]);
    
    useEffect(()=>{
        if(accessToken){

            const decodedToken = jwtDecode(accessToken);
            const expTime = decodedToken.exp;
            const curTime = Math.floor(Date.now()/1000);

            if(expTime > curTime){
                if(userId ===userIdToken){
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
    })

    return(
        
        <div className="replyItem">
            <div className="replyTop">
                <div className="replyId">
                    {comment.userId}
                </div>

                <div className="replyDate">
                    {comment.wrtnDate}
                </div>
            </div>

            <div className="replyBottom">
            {isPluggedIn ? (
                <div>
                    {mode ? (
                    <div>
                        <textarea className="replyWrite"
                        value={content}
                        onChange={(event)=>{
                            setContent(event.target.value);
                        }}
                        />
                        <div className="replyModifyButton">
                        <Button 
                            text={"완료"}
                            type={"replyRequestButton"}
                            onClick={()=>replyModify()}
                            
                            />
                        </div>
                    </div>

                ) : (
                    <div>
                        <div className="replyContent">
                            {comment.content}
                        </div>

                        <div className="replyRequestArea">
                            <div className="replyModifyButton">
                                <Button 
                                    text={"수정"}
                                    type={"replyRequestButton"}
                                    onClick={()=>{setMode(true);
                                    }}
                                    />
                            </div>

                            <div className="replyDeleteButton">
                                <Button 
                                text={"삭제"}
                                type={"replyRequestButton"}
                                onClick={()=>replyDelete()}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>)
                :(<div className="replyContent">
                    {comment.content}
                </div>)}
            </div>

           
        </div>
    )
}

export default ReplyListItem;
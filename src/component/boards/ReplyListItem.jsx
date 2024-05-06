import React, { useEffect, useState } from "react";
import Button from "../../component/common/Button";
import axios from "axios";
import { useNavigate } from "react-router";

function ReplyListItem(props){
    const {comment, postNo} =props;
    const [mode, setMode] = useState(false);
    const navigate = useNavigate();

    //수정 버튼을 눌렀을 때 textarea에 나타나는 comment
    const [content, setContent] = useState(comment.content);
    
    //댓글 insert함수
    const replyModify=()=>{
        const data = {
            content : content
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
           alert('댓글 수정');
           
            axios.post(`localhost://reply/replyupdate?postNo=${postNo}/?replyNo=${replyNo}`,data)
               .then((response)=>{
                console.log(response.data)

                //새로고침
                window.location.reload();

           })

            .catch(error=>{
            console.error("데이터 에러",error);
            })
       }
    
    const replyDelete=()=>{
        axios.post(`localhost://reply/replydelete?postNo=${postNo}/?replyNo=${replyNo}`,{
            'postNo' : postNo,
            'replyNo' : replyNo
        }).then((response)=>{
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
    }
    
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
            </div>

           
        </div>
    )
}

export default ReplyListItem;
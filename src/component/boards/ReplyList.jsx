import React, { useEffect, useState } from "react";
import ReplyListItem from "./ReplyListItem";
import axios from "axios";
import { useParams } from "react-router";

function ReplyList(props){
    const {postNo} = useParams();
    const {selectedCommunity} =props;
    
    const [comments, setComments] = useState(selectedCommunity ? selectedCommunity.reply || [] : []);
    
    //const [myId,setMyId] = useState("");
   

    useEffect(()=>{
        //community.postNo와 일치하는 댓글 정보 가져오기
        if(selectedCommunity && selectedCommunity.postNo){
            axios.get(`http://localhost:80/api/reply/replylist/${postNo}`)
                .then(response=>{
                    setComments(response.data.replylist);
            })
            .catch(error=>{
                console.log("error", error);
            })
        }

    },[selectedCommunity]);
    
    return(
        <div>
            <div className="replyCountArea">
                <div>댓글</div> 
                <div className="replyCount">{comments.length}</div>
            </div>
            {comments.map((comment)=>{
                return(
                    <ReplyListItem
                        userId={comment.userId}
                        key={comment.replyNo}
                        comment={comment}
                        postNo={postNo}
                        replyNo={comment.replyNo}
                        />
                );
            })}
        </div>
    )
}

export default ReplyList;
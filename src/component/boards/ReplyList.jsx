import React, { useEffect, useState } from "react";
import ReplyListItem from "./ReplyListItem";

function ReplyList(props){
    const {selectedCommunity} =props;
    
    const [comments, setComments] = useState(selectedCommunity ? selectedCommunity.reply || [] : []);
    
   

    useEffect(()=>{
        //community.postNo와 일치하는 댓글 정보 가져오기
        if(selectedCommunity && selectedCommunity.postNo){
        axios.get(`localhost://reply/replylist/${selectedCommunity.postNo}`)
            .then(response=>{
                setComments(response.data[0]);
                console.log(response.data[0]);
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
                        key={comment.replyNo}
                        comment={comment}
                        />
                );
            })}
        </div>
    )
}

export default ReplyList;
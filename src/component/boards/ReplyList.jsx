import React, { useEffect, useState } from "react";
import ReplyListItem from "./ReplyListItem";
import axios from "axios";
import { useParams } from "react-router";

function ReplyList(props){
    const {postNo} = useParams();
    const {selectedCommunity} =props;
    
    const [comments, setComments] = useState(selectedCommunity ? selectedCommunity.reply || [] : []);
    
   

    useEffect(()=>{
        //community.postNo와 일치하는 댓글 정보 가져오기
        if(selectedCommunity && selectedCommunity.postNo){
        // axios.get(`localhost://reply/replylist/${selectedCommunity.postNo}`)
        axios.get(`localhost://reply/replylist/?postNo=${postNo}`)
            .then(response=>{
                // setComments(response.data[0]);
                // console.log(response.data[0]);
                setComments(response.data);
                console.log(response.data);
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
                        postNo={postNo}
                        />
                );
            })}
        </div>
    )
}

export default ReplyList;
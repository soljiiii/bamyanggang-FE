import React, { useState } from "react";
import ReplyListItem from "./ReplyListItem";

function ReplyList(props){
    const {selectedCommunity} =props;
    
    const [comments, setComments] = useState(selectedCommunity ? selectedCommunity.reply || [] : []);

    // selectedCommunity가 변경될 때마다 댓글을 업데이트
    React.useEffect(() => {
        if (selectedCommunity) {
            setComments(selectedCommunity.reply || []);
        } else {
            setComments([]);
        }
    }, [selectedCommunity]);

    return(
        <div>
            <div className="replyCountArea">
                <div>댓글</div> <div className="replyCount">{comments.length}</div>
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
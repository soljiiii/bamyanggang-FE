import React from "react";

function ReplyListItem(props){
    const {comment} =props;

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
                <div className="replyContent">
                    {comment.content}
                </div>
            </div>


        </div>
    )
}

export default ReplyListItem;
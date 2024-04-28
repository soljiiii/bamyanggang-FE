import React from "react";

function NoticeListItem(props){
    const {noticeData, onClick} = props;

    return(
        
        <div className="noticeItem" onClick={onClick}>
            <div className="itemNo">{noticeData.postNo}</div>
            <div className="itemTitle">{noticeData.title}</div>
            <div className="itemWrtnDate">{noticeData.wrtnDate}</div>
            <br/><br/>
        </div>
    )
    
}

export default NoticeListItem;
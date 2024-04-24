import React from "react";
import NoticeListItem from "./NoticeListItem";

function NoticeList(props){
    const {notices} = props;

    return(
        <div>
            {notices.map((noticeData, index) =>{
                //notices에 저장되어 있는 많은 json 데이터를 noticeData로 하나하나 파싱해서 저장
                //noticeData : notice의 item 저장
                return(
                    <NoticeListItem 
                    key={noticeData.postNo}
                    noticeData={noticeData}
                    />
                )
            })}
        </div>
    )
}

export default NoticeList;
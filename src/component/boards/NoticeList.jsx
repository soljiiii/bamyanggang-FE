import React, { useCallback, useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import NoticeListItem from "./NoticeListItem";

function NoticeList(props){
    const {onClickItem} = props;
    //notices 변수의 값을 setNotices를 통해 저장, 현재 초기값은 []
    const [notices, setNotices] = useState([]);
    const [totalElement, setTotalElement] = useState(0);
    const [list, setList] = useState([]);

    useEffect(()=>{
        //axios를 사용하여 localhost:3301에서 notice 정보를 가져옴.
        axios.get(`http://localhost:80/notice/noticelist`)
            .then(response=> {
                //가져온 데이터를 상태로 설정
                setNotices(response.data.notices);
                setTotalElement(response.data.notices.length);
            })
            .catch(error =>{
                console.error("해당 데이터 에러", error);
            });
    
        }, []);
    

    //effect는 컴포넌트가 처음 렌더링 될 때 한 번만 실행된다

    //페이징처리


    return(
        <div>
            {notices.length > 0 && notices.map((noticeData) => {
                return(
                   <NoticeListItem
                        key={noticeData.postNo}
                        noticeData={noticeData}
                        onClick={()=>{
                            onClickItem(noticeData);
                        }}
                    />
                );
            })}
            {/* <div ref={obsRef}/> */}
        </div>
    );
   
}

export default NoticeList;
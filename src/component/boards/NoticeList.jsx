import React, { useEffect, useState } from "react";
import axios from "axios";
import NoticeListItem from "./NoticeListItem";

function NoticeList(props) {
    const { onClickItem } = props;
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        function handleScroll() {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop) {
                // 스크롤 다운
                if (!loading && hasMore && st + window.innerHeight >= document.documentElement.offsetHeight - 100) {
                    fetchData();
                }
            }
            setLastScrollTop(st <= 0 ? 0 : st);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore, lastScrollTop]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/notice/noticelist?page=${page}`);
            const nextData = response.data.notices;
            setNotices((prevData) => [...prevData, ...nextData]);
            setPage((page) => page + 1);
            setHasMore(nextData.length > 0);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="allList">
            {notices.map((noticeData) => (
                <NoticeListItem
                    key={noticeData.postNo}
                    noticeData={noticeData}
                    onClick={() => onClickItem(noticeData)}
                />
            ))}
            {loading && <div>Loading...</div>}
            {/* {!loading && !hasMore && <div className="finishLine">출력이 끝났습니다.</div>} */}
            </div>
        </div>
    );
}

export default NoticeList;

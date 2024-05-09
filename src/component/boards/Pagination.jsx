import React from "react";
import { useNavigate } from "react-router";

function Pagination({total, limit, page, setPage}){

    //총 페이지 수
    const numPages = Math.ceil(total/limit);

    const navigate = useNavigate();

    return(
        <div>
            <button className="pagingButton"
                onClick={()=>{
                    const prevPage = Math.max(1, page-1);
                    setPage(prevPage);
                    navigate(`/community?page=${prevPage}`);
                }} 
                disabled={page ===1}>
                    &lt; {/*< 기호표시 */}
            </button>

            {/*페이지 수 만큼 반복하여 각 페이지 버튼 생성하기*/}
            {Array(numPages)
            .fill()
            .map((_, i)=>(
                <button className="pagingButton"
                key={i+1}
                onClick={()=>{
                    const nextPage = i+1;
                    setPage(nextPage); //페이지설정
                    navigate(`/community?page=${nextPage}`);
                }}

                //다음 페이지가 있으면 page로 받고 없으면 undefined로 설정
                aria-current={page===i+1? "page" : undefined}
                >
                {i+1}
                </button>
            ))}

            <button className="pagingButton"
                onClick={()=>{
                    const nextPage = Math.min(page+1, numPages);
                    setPage(nextPage);
                    navigate(`/community?page=${nextPage}`);
                }} 
                disabled={page === numPages}>
                    &gt; {/*> 기호표시 */}
            </button>
        </div>
    )

}

export default Pagination;
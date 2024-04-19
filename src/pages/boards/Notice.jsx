import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Notice(){
    const {no} = useParams();

    if(no){
        return (
            <div>{no}번 공지사항</div>
        );
    }
    else{
        return(
            <div>
                <div>
                    <div>공지사항 목록표시</div>
                    <Link to="/notice/1">1번게시물</Link>
                </div>
            </div>
        ); 
    }
}

export default Notice;
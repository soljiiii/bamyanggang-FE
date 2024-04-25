import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Board(){
    const {no} = useParams();

    if(no){
        return (
            <div>{no}번 게시물 내용 표시</div>
        );
    }
    else{
        return(
            <div>
                <div>
                    <div>커뮤니티 목록표시</div>
                    <Link to="/board/1">1번게시물</Link>
                </div>
            </div>
        ); 
    }
}

export default Board;
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Header from "../../layouts/Header";
import SubBanner from "../../layouts/SubBanner";
import "./Board.css";

function Board(){
    return(
        <div>
            <Header />
            <SubBanner />
            <div className="boardList">
            <h1>커뮤니티</h1>
            <br/>
            <br/>
            </div>
        </div>
    )
}

export default Board;
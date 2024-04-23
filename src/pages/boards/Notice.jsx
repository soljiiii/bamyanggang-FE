import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Header from "../../layouts/Header";
import NoticeList from "../../component/boards/NoticeList";
import db from "../../../db.json"
import "./Notice.css";
import SubBanner from "../../layouts/SubBanner";


function Notice(){
    return(
        <div>
             <Header />
             <SubBanner />
             <div className="noticeList">
                <h1>공지사항</h1>
                    <br/>
                    <br/>
                    <NoticeList
                    notices={db.notice}
                    />
            </div>
        </div>
    )
}

export default Notice;
import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import SubBanner from "../../layouts/SubBanner";
import CommunityList from "../../component/boards/CommunityList";
import { useNavigate } from "react-router";
import "./Community.css";
import Button from "../../component/common/Button";
import axios from "axios";

function Community(){

    const navigate = useNavigate();

    //커뮤니티 글 리스트 저장
    const [community, setCommunity] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] =useState(1);
    const offset = (page - 1) * limit ;

    return(
        <div>
            <Header />
            <SubBanner />
            <div className="communityList">
                <h1>커뮤니티</h1>
                <br/>
                <br/>
                <CommunityList
                onClickItem={(communityData)=>{
                    navigate(`/community/${communityData.postNo}`)
                }}
                />

                    <div className="buttonArea">
                        <Button 
                        text={"글 작성"}
                        type={"communityButton"}
                        onClick={()=>{
                            navigate(`/community/post-write`);
                        }}
                        />
                    </div>
                    
                    <div className="pageArea">
                        {community.slice(offset, offset+limit)}
                    </div>
            </div>
        </div>
    )
}

export default Community;
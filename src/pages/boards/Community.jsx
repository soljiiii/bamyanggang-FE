import React from "react";
import Header from "../../layouts/Header";
import SubBanner from "../../layouts/SubBanner";
import CommunityList from "../../component/boards/CommunityList";
import { useNavigate } from "react-router";
import "./Community.css";


function Community(){
    const navigate = useNavigate();

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
                
            </div>
        </div>
    )
}

export default Community;
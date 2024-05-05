import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import SubBanner from "../../layouts/SubBanner";
import CommunityList from "../../component/boards/CommunityList";
import { useNavigate } from "react-router";
import "./Community.css";
import Button from "../../component/common/Button";
import Pagination from "../../component/boards/Pagination";
import axios from "axios";

function Community(){
    
    const navigate = useNavigate();
    const [community, setCommunity] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    

    useEffect(() => {
        //community 정보 가져오기
        axios.get('localhost://community/communitylist')
            .then(response => {
                setCommunity(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log("error:", error);
            });
    }, []);


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
                community={community} //props전달
                limit={limit}
                page={page}
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
                        <Pagination
                        total={community.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                        />
                    </div>
            </div>
        </div>
    )
}

export default Community;
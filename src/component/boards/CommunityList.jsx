import axios from "axios";
import React, { useEffect, useState } from "react";
import CommunityListItem from "./CommunityListItem";

function CommunityList(props){
    const {onClickItem} = props;
    const [communities, setCommunities] = useState([]);
    
    useEffect(()=>{
        axios.get('http://localhost:3001/community')
            .then(response=>{
                setCommunities(response.data);
                console.log(response.data);
            })

            .catch(error=>{
                console.log("error:", error);
            })
    },[]);

    return(
        <div>
            {communities.map((communityData, index) =>{
                return(
                    <CommunityListItem
                    key={communityData.postNo}
                    communityData={communityData}
                    onClick={()=>{
                        onClickItem(communityData);
                    }}
                    />
                )
            })}
        </div>
    )
}

export default CommunityList;
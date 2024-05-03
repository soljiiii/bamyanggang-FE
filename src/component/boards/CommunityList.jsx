// import axios from "axios";
// import React, { useEffect, useState } from "react";
import CommunityListItem from "./CommunityListItem";

function CommunityList(props){
    const {onClickItem, community, limit, page} = props;
    const offset = (page - 1) * limit;

    return(
        <div>
            {community.slice(offset, offset+limit).map((communityData) => {
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
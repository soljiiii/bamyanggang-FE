import React from "react";

function CommunityListItem(props){
    const {communityData, onClick} = props;

    return(
        
        <div className="communityItem" onClick={onClick}>
            <div className="communityNo">{communityData.postNo}</div>
            <div className="communityTitle">{communityData.title}</div>
            <div className="communityId">{communityData.userId}</div>
            <div className="communityWrtnDate">{communityData.wrtnDate}</div>
            <div className="communityVwCnt">{communityData.vwCnt}</div>
            <br/><br/>
        </div>
    )
    
}

export default CommunityListItem;
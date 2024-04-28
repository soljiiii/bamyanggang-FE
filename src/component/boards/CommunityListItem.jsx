import React from "react";

function CommunityListItem(props){

    const {communityData, onClick} = props;

    return(
        <div className="communityItem" onClick={onClick}>
            <div className="itemNo">{communityData.postNo}</div>
            <div className="itemTitle">{communityData.title}</div>
            <div className="itemId">{communityData.userId}</div>
            <div className="itemWrtnDate">{communityData.wrtnDate}</div>
            <br/><br/>
        </div>
    )
}

export default CommunityListItem;
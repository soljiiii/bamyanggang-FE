import React, { useEffect, useState } from "react";

function CommunityList(props){
    const {onClickItem} = props;
    const {communities, setCommunities} = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/board')
            .then(response=>{
                //가져온 데이터를 communities에 대입
                setCommunities(response.data);
                console.log(response.data);
            })
    })
    return(
        <div>

        </div>
    )
}

export default CommunityList;
import React from "react";
import { useParams } from "react-router";

function OnGame(){
    const{roomNo} = useParams();
    return <div>게임 :{roomNo}</div>
}

export default OnGame;
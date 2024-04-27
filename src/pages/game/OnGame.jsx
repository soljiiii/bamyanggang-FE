import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import FaceChat from "../../component/game/FaceChat";

function OnGame(){
    const{roomNo} = useParams();
    const [onGameInfo,setOnGameInfo] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:3001/ongame/?roomNo=${roomNo}`)
        .then (response =>{
            setOnGameInfo(response.data);
        });
    },[roomNo]);
    console.log(onGameInfo)

    return (
        <div className="onGameBody">
            <div className="faceBox">
                {onGameInfo.map((onGameParty, index)=>(
                    <div key={index} className="onGamePartyBox">
                        <FaceChat 
                            onGameParty={onGameParty}
                        />
                    </div>
                ))}
            </div>
            <div className="voteBox"></div>
            <div className="roleBox"></div>
            <div className="chatBox"></div>
        </div>
    );
}

export default OnGame;
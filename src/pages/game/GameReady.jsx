import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../../component/common/Button"
import axios from "axios";


function GameReady(){
    //게임 정보 불러오기
    const {roomNo} = useParams();
    console.log(roomNo);
    const [gameInfo, setGameInfo] = useState(null);

    useEffect(()=>{
        axios.get (`http://localhost:3001/game/?roomNo=${roomNo}`)
            .then(response => {
                setGameInfo(response.data);
            })
            .catch(error => {
                console.error('Error get game:', error);
            });
    },[roomNo]);
        
    return (
        <div className="gameReadyContainer">
            <div className="partyContainer">
            </div>
            <div className="gameInfo">
                <div className="roomName"></div>
                <div className="roomCode"></div>
                <div className="peopleCnt"></div>
            </div>
            <div className="startButton">
                <Button/>
            </div>
            <div className="exitButton">
                <Button/>
            </div>
        </div>
    );
}

export default GameReady;
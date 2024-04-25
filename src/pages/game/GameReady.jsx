import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../../component/common/Button"
import axios from "axios";
import Party from "../../component/game/Party";
import "./GameReady.css";


function GameReady(){

    const {roomNo} = useParams();
    const [gameInfo, setGameInfo] = useState([]);
    const [gameParty, setGameParty] = useState([]);

    //게임 정보 불러오기
    useEffect(()=>{
        axios.get (`http://localhost:3001/game/?roomNo=${roomNo}`)
            .then(response => {
                setGameInfo(response.data[0]);
            })
            .catch(error => {
                console.error('Error get game:', error);
            });
    },[roomNo]);

    //게임 참가자 정보 불러오기
    useEffect(()=>{
        axios.get (`http://localhost:3001/party/?roomNo=${roomNo}`)
            .then(response => {
                setGameParty(response.data);
            })
            .catch(error => {
                console.error('Error get game:', error);
            });
    },[roomNo]);

    console.log("gmaInfo",gameInfo)
    console.log("방:",gameInfo.roomNm)

    //게임 시작
    function handleStart(){
        
    }

    //게임 나가기
    function handleExit(){

    }


    return (
        <div className="gameContainer">
            <div className="gameReadyContainer">
                <div className="userContainer">
                    {gameParty && gameParty.map((party,index)=>(
                        <div key={index} className="userInfo">
                            <Party
                                party={party}
                            />
                        </div>
                    ))}
                </div>
                {gameInfo && (
                    <div className="gameInfoBox">
                        <div className="roomNameBox">{gameInfo.roomNm}</div>
                        <div className="roomCode">gameCode {gameInfo.roomCd}</div>
                        <div className="peopleCnt">
                            <img className="readyPartyImg" src="/images-jsx/party.png"/>
                            {gameInfo.joinCnt} 명 참가중
                        </div>
                        <div className="sheepImgBox">
                            <img className="sheepImg" src="/images-jsx/양.svg"/>
                        </div>
                    </div>
                )}
                <div className="startButtonBox">
                    <Button
                        type="startButton"
                        text="GAME START"
                        onClick={handleStart}
                    />
                </div>
                <div className="exitButtonBox">
                    <Button
                        type="exitButton"
                        text="EXIT"
                        onClick={handleExit}
                    />
                </div>
                <div className="readyLogImgBox">
                    <img className="readyLogImg" src="/images-jsx/밤양갱_black.svg"/>
                </div>
            </div>
        </div>   
    );
}

export default GameReady;

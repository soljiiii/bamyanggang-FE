import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../../component/common/Button"
import axios from "axios";
import Party from "../../component/game/Party";
import "./GameReady.css";
import { useNavigate } from 'react-router-dom';
// *** 아이디 값 불러오기 ***

function GameReady(){

    const {roomNo} = useParams();
    const [gameInfo, setGameInfo] = useState([]);
    const [gameParty, setGameParty] = useState([]);
    const navigate = useNavigate();

    const userIdentity = "test1"; //jwt값 가져오기

    //게임 정보 불러오기
    useEffect(()=>{
        axios.get (`getRoomInfo/?roomNo=${roomNo}`)
            .then(response => {
                setGameInfo(response.data[0]);
            })
            .catch(error => {
                console.error('Error get game:', error);
            });
    },[roomNo]);

    //게임 참가자 정보 불러오기
    useEffect(()=>{
        axios.get (`getUserInfo/?roomNo=${roomNo}`)
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
    function handleStart() {
        // userIdentity와 일치하는 요소를 찾기
        const userParty = gameParty.find(party => party.userId === userIdentity);
    
        // userParty가 존재하고, 해당 요소의 master 값이 1인지 확인
        if (userParty && userParty.master === 1) {
            navigate(`/onGame/${roomNo}`);
        } else {
            alert("권한이 없다능");
        }
    }
    

    //게임 나가기
    function handleExit(){
        const data = {
            roomNo:gameInfo.roomNo,
            userId:userIdentity
        }
        axios.post(`exitRoom`)
        .then(response => {
            console.log("전송 성공");
            navigate(`/gameSearch`);
        });
    }


    return (
        <div className="gameContainer">
            <div className="gameReadyContainer">
                <div className="userContainer_game">
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
                        <div className="peopleCntBox">
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

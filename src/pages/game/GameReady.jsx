import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../../component/common/Button"
import axios from "axios";
import Party from "../../component/game/Party";
import "./GameReady.css";
import { useNavigate } from 'react-router-dom';
import LoginCheck from '../../utils/LoginCheck';
// *** 아이디 값 불러오기 ***

function GameReady(){

    const {roomNo} = useParams();
    const [gameInfo, setGameInfo] = useState([]);
    const [gameParty, setGameParty] = useState([]);
    const [pageState, setPageState] = useState(0);
    const [nowUser, setNowUser] = useState([]);
    const navigate = useNavigate();

    const userIdToken = JSON.parse(localStorage.getItem('user')).userId;



    useEffect(() => {
        const fetchGameInfo = async () => {
            
                const response = await axios.get(`http://localhost:80/getRoomInfo?roomNo=${roomNo}`);
                setGameInfo(response.data["방 대기 정보"]);
                setPageState(response.data["방 대기 정보"].isOnGame);
                console.log(pageState);
                if (response.data["방 대기 정보"].isOnGame === 1) {
                    navigate(`/onGame/${roomNo}`);
                    window.location.reload();
                }
            
            // 5초 후에 다시 실행하도록 설정
            setTimeout(fetchGameInfo, 5000); // 5초(5000밀리초) 후에 다시 호출
        };
    
        // 처음에 한 번 실행하고, 그 후에는 주기적으로 실행됨
        fetchGameInfo();
    }, [roomNo, pageState]); // roomNo나 pageState가 변경될 때마다 Effect가 재실행됨
    

    //게임 참가자 정보 불러오기
    useEffect(() => {
        const fetchGameInfo = async () => {
        axios.get (`http://localhost:80/getUserInfo?roomNo=${roomNo}`)
            .then(response => {
                setGameParty(response.data["방 대기 정보"]);
                for(var i=0; i<response.data["방 대기 정보"].length; i++){
                    if(response.data["방 대기 정보"][i].userId === userIdToken){
                        setNowUser(response.data["방 대기 정보"][i])
                        console.log("한번찍어주실수있습니까",gameParty)
                    }
                }
            })
            .catch(error => {
                console.error('Error get game:', error);
            });

            setTimeout(fetchGameInfo, 5000); 
        };

        fetchGameInfo();
    }, [roomNo, pageState]);

    console.log("gmaInfo",gameInfo)
    console.log("방:",gameInfo.roomNm)
    console.log("idToken",userIdToken)

    //게임 시작
    function handleStart() {
        // userParty가 존재하고, 해당 요소의 master 값이 1인지 확인
        if (gameParty && nowUser.master === 1) {
            axios.get(`http://localhost:80/getIsOnGame?roomNo=${roomNo}`)
            .then(response =>{
                setPageState(response.data["isOnGame"]);
            })
            .catch(error => {
                console.error('Error get game:', error);
            });
        } else {
            alert("권한이 없다능");
        }
    }

    //게임 나가기
    function handleExit(){
        const data = {
            roomNo:roomNo,
            userId:userIdToken
        }
        console.log(data);
        axios.post(`http://localhost:80/exitRoom`,data)
        .then(response => {
            console.log("전송 성공");
            navigate(`/gameSearch`);
        });
    }

    return (
        <div className="gameContainer">
            <LoginCheck/>
            <div className="gameReadyContainer">
                <div className="userContainer_game">
                    {Array.isArray(gameParty) && gameParty.map((party,index)=>(
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

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
    const navigate = useNavigate();

    const userIdToken = JSON.parse(localStorage.getItem('user')).userId;



    useEffect(() => {
        const fetchGameInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:80/getRoomInfo?roomNo=${roomNo}`);
                setGameInfo(response.data["방 대기 정보"]);
                setPageState(response.data["방 대기 정보"].isOnGame);
                console.log(pageState);
                if (pageState === 1) {
                    navigate(`/onGame/${roomNo}`);
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error getting game:', error);
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
        // userIdentity와 일치하는 요소를 찾기
        const userParty = gameParty.find(party => party.userId === userIdToken);
    
        // userParty가 존재하고, 해당 요소의 master 값이 1인지 확인
        if (userParty && userParty.master === 1) {
            axios.get(`http://localhost:80/getIsOnGame?roomNo=${roomNo}`)
            .then(response =>{
                setPageState(response.data["isOnGame"]);
                window.location.reload();
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

    // //url 벗어나면 퇴장
    // useEffect(() => {
    //     // 페이지 이동할 때 실행될 cleanup 함수
    //     const cleanup = () => {
    //         const data = {
    //             roomNo: roomNo,
    //             userId: userIdToken
    //         };
    //         console.log(data);
    //         axios.post(`http://localhost:80/exitRoom`, data)
    //             .then(response => {
    //                 console.log("전송 성공");
    //                 history.push(`/gameSearch`);
    //             })
    //             .catch(error => {
    //                 console.error("전송 실패", error);
    //             });
    //     };

    //     // 페이지 이동될 때 cleanup 함수 실행
    //     return () => {
    //         cleanup();
    //     };
    // }, [roomNo, userIdToken, history]);


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

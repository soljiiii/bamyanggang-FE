import "./PrivateRoom.css";
import Button from "../common/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// *** 로그인 시에만 조인 가능한 로직 추가 + 아이디 값 불러오기 ***

function PrivateRoom ({roomList}) {

    const [isOnGame, setIsOnGame] = useState(roomList.isOnGame);
    const [joinCnt, setJoinCnt] = useState(roomList.joinCnt);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleInputChange(e){
        if(password.length<4){
            setPassword(e.target.value);   
        }
        else {
            setPassword("");
        }
    }

    function handleJoinPrivate(){
        if(isOnGame===1){
            alert("이미 게임 진행중 입니다");
        }
        else{
            if(joinCnt===6){
                alert("방이 꽉찼습니다");
            }
            else{
                if(password==="" || password!==roomList.roomPw){
                    alert("올바른 비밀번호를 입력하세요")
                }
                else if(password===roomList.roomPw){
                    const data = {
                        userIdToken:'test',
                        roomNm:roomList.roomNm,
                        roomNo:roomList.roomNo
                    }
                    axios.post('joinRoom',data)
                    .then(response => {
                        console.log(response.data);
                        const roomNo = response.data.roomNo
                        navigate(`/gameReady/${roomNo}`)
                    })
                    .catch(error => {
                        console.error('Error join game:', error);
                    });
                }
            }
        }
    }

    return(
        <div className="privateRoomContainer">
            <div className="privateName">
                {roomList.roomNm}
            </div>
            <div className="privatePeople">
                <div className="peopleImg">
                    <img  className="peopleImg" src="images-jsx/party.png"/>
                </div>
                <div className="peopleCnt">
                    {roomList.joinCnt}명 참여중
                </div>
            </div>
            <div className="onGameBox">
                {roomList.isOnGame===0?
                (<span className="watingGameText">게임 대기 중</span>):
                (<span className="startGameText">게임 중</span>)}
            </div>
            <div className="privateTag">
                <img className="lockImg" src="images-jsx/lock.png"/>
                <div className="privateText">
                    <input
                        className="insertRoomPw"
                        placeholder="join password"
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="privateJoinButtonBox">    
                <Button
                    type="privateJoinButton"
                    text="Join"
                    onClick={handleJoinPrivate}
                />
            </div>
        </div>
    );
}

export default PrivateRoom;
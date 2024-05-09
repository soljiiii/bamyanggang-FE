import axios from "axios";
import Button from "../common/Button";
import Input from "../common/Input";
import "./Modal.css"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCheck from '../../utils/LoginCheck';
// *** 로그인 시에만 방 생성 가능한 로직 추가 + 아이디 값 불러오기 ***


function Modal({ isOpen, onClose, userIdToken }) {
    
    const [roomNm, setRoomNm] = useState("");
    const [isPrivate, setIsPrivate] = useState(0);
    const [roomPw, setRoomPw] = useState("");

    const navigate = useNavigate();

    //new게임 버튼 눌렀을때 post 수행
    function createGame(){
        if(roomNm===""){
            alert("방 이름은 필수 입니다!");
        }
        else {
            if(isPrivate===0||(isPrivate===1&&roomPw!=="")){
            const data = {
                userId:userIdToken,
                roomNm:roomNm,
                roomSt:isPrivate ?1:0,
                roomPw:roomPw
            };
    
            axios.post('http://localhost:80/createRoom',data)
                .then(response => {
                    console.log(response.data)
                    const roomNo = response.data.roomNo; //response.data.roomNo;
                    //백엔드에 post 요청을 하고 돌려받은 리턴값으로 roomNo
                    navigate(`/gameReady/${roomNo}`)
                })
                .catch(error => {
                    console.error('Error creating game:', error);
                });
            }
            else if(isPrivate===1 && roomPw===""){
                alert("비밀번호를 입력하세요");
            }
        }
    }
    
    //roomNm, roomPw 값 변경 
    //자식 컴포넌트인 Input에서 넘어온 값을 새로 대입한다
    function handleNameChange(newValue) {
        if(newValue.length<=10){
            setRoomNm(newValue);
        }
    }
    function handlePwChange(newValue) {
        if(newValue.length<=10 && isPrivate===1){
            setRoomPw(newValue);
        }
    }
    //isPrivate 값 변경
    function handleCheck(e){
        if(isPrivate===0){
            setIsPrivate(1);
        }
        else{
            setIsPrivate(0);
        }
    }

    //span태그 안에 아이템을 onClick하면 부모컴포넌트에서 onclose전달됨
    function handleCloseModal(){
        setRoomNm("");
        setIsPrivate(0);
        setRoomPw("");
        onClose();
    }

    return (
        <div>
            <LoginCheck/>
            {isOpen && (
                <div className="modal">
                <span className="close" onClick={handleCloseModal}>&times;</span>
                <div className="modal-content">
                    <div className="allInput">
                    <div className="RoomNameContainer">
                        <div className="roomNameText">RoomName</div>
                        <Input
                            type="roomName"
                            name="roomName"
                            placeholder={"방 이름을 입력하세요"}
                            onChange={handleNameChange}
                            value={roomNm}
                        />
                    </div>
                    <div className="pwContainer">
                        <label>
                            <input 
                                type="checkbox" 
                                className="checkbox"
                                checked={isPrivate}
                                onChange={handleCheck}
                            />
                            비밀방 설정
                        </label>
                        <Input
                            type="roomPw"
                            name="roomPw"
                            placeholder={"비밀번호를 입력하세요"}
                            onChange={handlePwChange}
                            value={roomPw}
                        />
                    </div>
                    </div>
                    <div className="buttonContainer">
                        <Button
                            type="createButton"
                            text="New Game"
                            onClick={createGame}
                        />
                    </div>
                </div>
                </div>
            )}
        </div>
    );
}

export default Modal;
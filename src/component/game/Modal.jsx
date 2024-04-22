import axios from "axios";
import Button from "../common/Button";
import Input from "../common/Input";
import "./Modal.css"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Modal({ isOpen, onClose }) {
    
    const [roomName, setRoomName] = useState("");
    const [isPrivate, setIsPrivate] = useState(0);
    const [roomPw, setRoomPw] = useState("");

    const navigate = useNavigate();

    //new게임 버튼 눌렀을때 post 수행
    function createGame(){
        if(roomName===""){
            alert("방 이름은 필수 입니다!");
        }
        else {
            if(isPrivate===0||(isPrivate===1&&roomPw!=="")){
            const data = {
                userIdToken:'test',
                roomNm:roomName,
                roomSt:isPrivate ?1:0,
                roomPw:roomPw
            };
    
            axios.post('http://localhost:3001/games',data)
                .then(response => {
                    console.log(response.data)
                    const roomNo = 1234;//response.data.roomNo;
                    navigate(`/onGame/${roomNo}`)
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
    
    //roomName, roomPw 값 변경 
    //자식 컴포넌트인 Input에서 넘어온 값을 새로 대입한다
    function handleNameChange(newValue) {
        if(newValue.length<=10){
            setRoomName(newValue);
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
        setRoomName("");
        setIsPrivate(0);
        setRoomPw("");
        onClose();
    }

    return (
        <div>
            {isOpen && (
                <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleCloseModal}>&times;</span>
                    <div className="allInput">
                    <div className="RoomNameContainer">
                        <div className="roomNameText">RoomName</div>
                        <Input
                            type="roomName"
                            name="roomName"
                            placeholder={"방 이름을 입력하세요"}
                            onChange={handleNameChange}
                            value={roomName}
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
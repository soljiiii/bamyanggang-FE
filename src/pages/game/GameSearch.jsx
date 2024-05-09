import "./GameSearch.css";
import { useState, useEffect } from "react";
import Button from "../../component/common/Button";
import Input from "../../component/common/Input"
import Modal from "../../component/game/Modal";
import axios from "axios";
import NormalRoom from "../../component/game/NormalRoom";
import PrivateRoom from "../../component/game/PrivateRoom";
import Header from"../../layouts/Header";
import SubBanner from "../../layouts/SubBanner";


function GameSearch(){

    const userIdToken = JSON.parse(localStorage.getItem('user')).userId;

    //로그인 상태 확인
    const accessToken = localStorage.getItem('access');
    const [isPluggedIn, setIsPluggedIn] = useState(false);

    useEffect(()=>{
        if(accessToken){

        //     const decodedToken = jwtDecode(accessToken);
        //     const expTime = decodedToken.exp;
        //     const curTime = Math.floor(Date.now()/1000);

        //     if(expTime > curTime){
        //         if(myId===userIdToken){
        //             setIsPluggedIn(true);
        //         } else{
        //             setIsPluggedIn(false);
        //         }
        //     }
        //     else{
        //         setIsPluggedIn(false);
        //     }
        // }else{
        //     //로그인을 하지 않았을 때
        //     setIsPluggedIn(false);
            setIsPluggedIn(true);
        }                        
    },[])
    

    //방 목록 전체 불러오기
    const[roomList, setRoomList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/api/getRoomList')
            .then(response => {
                setRoomList(response.data["방 목록"]);
            })
    }, [roomList]); 

    
    //Modal 상태에 대해
    const [isModalOpen, setIsModalOpen] = useState(false);

    function ModalOpenState(){
        if(isModalOpen===true){
            setIsModalOpen(false);
        }
        else{
            setIsModalOpen(true);
        }
    }

    //코드로 검색
    const [search, setSearch] = useState("");

    function handleSearchChange (newValue){
        if(newValue.length<=7){
            setSearch(newValue); 
        }
    }

    //대기방만 보기
    const [watingButton, setWatingButton] = useState(0);
    function handleWatingButton(){
        if(watingButton===1){
            setWatingButton(0);
        }
        else{
            setWatingButton(1);
        }
    }

    return (
        <>
        <Header/>
        <SubBanner/>
        <div className="gameSearchContainer">
            <div className="topBody">
                <div className="gameCreateButton">
                    <Button
                        type="gameCreate"
                        text="New Game"
                        onClick={ModalOpenState}
                    />
                    <Modal
                        isOpen={isModalOpen} 
                        onClose={ModalOpenState}
                        userIdToken={userIdToken}
                    />
                </div>
                <div className="onlyWatingButton">
                    <Button
                        type="gameCommon"
                        text="대기방만 보기"
                        onClick={handleWatingButton}
                    />
                </div>
                <div className="gameSearchInput">
                    <Input
                        type="searchCode"
                        name="searchCode"
                        placeholder={"코드로 검색 해보세요!"}
                        onChange={handleSearchChange}
                        value={search}
                    />
                </div>
            </div>
            <div className="middleBody">
                {roomList.length > 0 ? 
                (watingButton===0?
                    (roomList
                    .filter((room)=>room.roomCd && room.roomCd.includes(search))
                    .map(room=>(
                        <div key={room.roomNo} className="roomComponent"> 
                            {room.roomSt ===0? 
                                <NormalRoom
                                roomList={room}
                                userIdToken={userIdToken}
                                isPluggedIn={isPluggedIn}
                                />
                            : 
                                <PrivateRoom   
                                roomList={room}
                                userIdToken={userIdToken}
                                isPluggedIn={isPluggedIn}
                                />
                            }
                        </div>
                    ))
                    )
                    :(roomList
                        .filter((room)=>room.roomCd && room.roomCd.includes(search))
                        .filter((room)=>room.isOnGame===0)
                        .map(room=>(
                            <div key={room.roomNo} className="roomComponent"> 
                                {room.roomSt ===0? 
                                    <NormalRoom
                                    roomList={room}
                                    />
                                : 
                                    <PrivateRoom   
                                    roomList={room}
                                    />
                                }
                            </div>
                        ))
                    )
                ):
                <div>방이 없습니다 ! 새로운 게임을 시작해보세요!</div>
            }
            </div>
        </div>
        </>
    );
}
export default GameSearch;
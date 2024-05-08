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

// *** 아이디 값 불러오기 ***

function GameSearch(){

    //방 목록 전체 불러오기
    const[roomList, setRoomList] = useState([]);

    useEffect(() => {
        const fetchGameList = async () => {
        axios.get('http://localhost:80/getRoomList')
            .then(response => {
                setRoomList(response.data["방 목록"]);
            })
            // 30 후에 다시 실행하도록 설정
            setTimeout(fetchGameList, 30000); // 
        };
    
        // 처음에 한 번 실행하고, 그 후에는 주기적으로 실행됨
        fetchGameList();
    }, [roomList]); // roomNo나 pageState가 변경될 때마다 Effect가 재실행됨

    
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
                                />
                            : 
                                <PrivateRoom   
                                roomList={room}
                                userIdToken={userIdToken}
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
import "./GameSearch.css";
import { useState } from "react";
import Button from "../../component/common/Button";
import Input from "../../component/common/Input"
import Modal from "../../component/game/Modal";

function GameSearch(){

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

    //코드 입력창 상태
    const [search, setSearch] = useState("");

    function handleSearchChange (newValue){
        if(newValue.length<=7){
            setSearch(newValue); 
        }
    }

    function showWating(){
        alert("대기방만 보기")
    }

    return (
        <div>
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
                    />
                </div>
                <div className="onlyWatingButton">
                    <Button
                        type="gameCommon"
                        text="대기방만 보기"
                        onClick={showWating}
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
                <div>

                </div>
            </div>
        </div>
    );
}
export default GameSearch;
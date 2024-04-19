import "./GameSearch.css";
import Button from "../../component/common/Button";
import Input from "../../component/common/Input";


function GameSearch(){

    function openPopUp(){
        alert("방생성")
    }
    function showWating(){
        alert("대기방만 보기")
    }

    return (
        <div>
            <div>
                <Button
                    type="gameCreate"
                    text="게임 만들기"
                    onClick={openPopUp}
                />
            </div>
            <div>
                <Button
                    type="gameCommon"
                    text="join"
                    onClick={showWating}
                />
            </div>
            <div>
                <Input
                    type="searchCode"
                    name="searchCode"
                    placeholder={"코드로 검색 해보세요!"}
                />
            </div>

        </div>
    );
}
export default GameSearch;
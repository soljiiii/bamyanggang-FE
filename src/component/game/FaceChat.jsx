import "../../pages/game/OnGame.css";

function FaceChat({onGameParty}) {
    
    return(
        <div className="faceChatContent">
            <div className="videoBox"></div>
            <div className="nickNmContent">{onGameParty.userNickNm}</div>
        </div>
    );   
}

export default FaceChat;


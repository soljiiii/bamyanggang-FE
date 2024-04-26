import Janus from "../../apis/janus";

function FaceChat({onGameParty}) {

    console.log(onGameParty)
    return(
        <div className="faceChatContent">
            <div className="nickNmContent">{onGameParty.userNickNm}</div>
            <div className="videoBox"></div>
        </div>
    );   
}

export default FaceChat;


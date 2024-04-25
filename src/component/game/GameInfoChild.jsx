function GameInfoChild({ gameInfo }) {
    console.log("child",gameInfo)

    return (
        <div>
            <div className="roomNameBox">방이름{gameInfo.roomNm}</div>
            <div className="roomCode">방코드{gameInfo.roomCd}</div>
            <div className="peopleCnt">{gameInfo.joinCnt}명 참가중</div> 
        </div>
    );
}

export default GameInfoChild;

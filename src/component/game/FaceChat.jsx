import React, { useEffect, useRef, useState } from 'react';
import "../../pages/game/OnGame.css";

function FaceChat({ onGameParty,janus,pluginHandle }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (!janus || !pluginHandle || !videoRef.current) return;
    
        // 비디오 엘리먼트에 스트림 연결
        janus.attachMediaStream(videoRef.current, pluginHandle.webrtcStuff.remoteStream);
    }, [janus, pluginHandle]);

    return (
        <div className="faceChatContent">
            <div className="videoBox">
                <video ref={videoRef} autoPlay playsInline muted={true}></video>
            </div>
            <div className="nickNmContent">{onGameParty.userNickNm}</div>
        </div>
    );
}

export default FaceChat;


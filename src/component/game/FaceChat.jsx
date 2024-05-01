import React, { useEffect, useRef, useState } from 'react';
import "../../pages/game/OnGame.css";

function FaceChat({ onGameParty, janus, pluginHandle }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (!janus || !pluginHandle || !videoRef.current) return;

        // 플러그인 메시지를 처리하는 이벤트 핸들러 설정
        pluginHandle.onmessage = (msg, jsep) => {
            const event = msg["videoroom"];
            if (event === "attached") {
                // 비디오 스트림 연결
                if (jsep) {
                    pluginHandle.handleRemoteJsep({ jsep: jsep });
                }
            } else if (msg["error"]) {
                console.error("Error attaching VideoRoom plugin:", msg["error"]);
            }
        };

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

import adapter from 'webrtc-adapter';
import React, { useEffect, useRef, useState } from 'react';
import Janus from "../../apis/janus";
import "../../pages/game/OnGame.css";

function FaceChat({ onGameParty }) {
    const videoRef = useRef(null);
    const [janus, setJanus] = useState(null);

    useEffect(() => {
        async function initializeJanus() {
            if (!adapter.browserDetails.browser) {
                console.error("WebRTC adapter not found!");
                return;
            }
            try {
                await Janus.init({ debug: "all" });
                const janusInstance = new Janus({ server: 'https://janus.jsflux.co.kr/janus' });
                setJanus(janusInstance);
            } catch (error) {
                console.error("Error initializing Janus:", error);
            }
        }
        initializeJanus();
    }, []);

    useEffect(() => {
        if (!janus) return;

        async function attachVideoRoomPlugin() {
            try {
                await janus.attach({
                    plugin: "janus.plugin.videoroom",
                    opaqueId: "videoroomtest-"+Janus.randomString(12),
                    success: function (pluginHandle) {
                        setSfutest(pluginHandle);
                        console.log("Plugin attached! (" + pluginHandle.getPlugin() + ", id=" + pluginHandle.getId() + ")");
                        console.log("  -- This is a publisher/manager");
                    },
                    error: function (error) {
                        console.error("Error attaching plugin...", error);
                    }
                });
            } catch (error) {
                console.error("Error attaching VideoRoom plugin:", error);
            }
        }
        attachVideoRoomPlugin();
    }, [janus]);

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


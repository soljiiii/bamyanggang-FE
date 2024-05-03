import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import FaceChat from "../../component/game/FaceChat";
import Button  from "../../component/common/Button";


import Janus from "../../apis/janus";
function OnGame(){
    const {roomNo} = useParams();
    const [onGameParty, setOnGameParty] = useState([]);
    const [selectedParty, setSelectedParty] = useState("");
    const [nowUser, setNowUser] = useState([]); //현재 세션 id를 가진 사용자의 정보 
    const [onGameState,setOnGameState] = useState(0); //게임 진행중
    const [winner, setWinner] = useState(0); //게임 승자 
    const [onNormalVote, setOnNormalVote] = useState(0); //전체 투표
    const [onMafiaVote, setOnMafiaVote] = useState(0); //마피아 투표
    const [onDiePeople, setOnDiePeople] = useState("");//죽은 사람 받기
    const [timeLineState, setTimeLineState] = useState("🎲🤖게임 시작🤖🎲");
    const [pluginHandle, setPluginHandle] = useState(null);
    const [userNick, setUserNick] = useState("");

    const userIdentity = "test2";

    //참여 user 정보 6개 받아옴
    useEffect(()=>{
        axios.get(`http://localhost:3001/party/?roomNo=${roomNo}`)
        .then(response =>{
            setOnGameParty(response.data);
            for(var i=0; i<response.data.length; i++){
                if(response.data[i].userId === userIdentity){
                    setNowUser(response.data[i])
                    setUserNick(response.data[i].userNickNm)
                }
            }
        })
    },[roomNo])    
    
    useEffect(() => {

        var server = "https://janus.jsflux.co.kr/janus"; //jsflux janus server url
        var janus = null;
        var sfutest = null; //플러그인 객체
        var opaqueId = "videoroomtest-"+Janus.randomString(12); //플러그인 인스턴스 식별
        var myroom = roomNo; //비디오 룸 식별 (방 이름 개념)
        var room = null; //비디오 룸 식별 (서버에서)
        var myid = null; //클라이언트 식별
        var mypvtid = null; //클라이언트의 개인 id
        var username = userNick;
        var stream = null

        if (roomNo !== null && userNick !== "") {

        // getUserMedia를 사용하여 비디오 스트림을 요청합니다.
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((userStream) => {
            stream = userStream;
            // 성공적으로 스트림을 가져온 경우, 해당 스트림을 비디오 요소에 연결합니다.
            const videoElement = document.getElementById('video1'); // video1 요소에 연결
            if (videoElement) {
                videoElement.srcObject = stream;
            }
        })
        .catch((error) => {
            console.error('Error accessing media devices:', error);
        });
            //야누스 초기화
            Janus.init({
                debug: "all",
                callback: function() {
                    if (!Janus.isWebrtcSupported()) {
                        //bootbox.alert("No WebRTC support... ");
                        alert("No WebRTC support... ");
                        return;
                    }
                    janus = new Janus({
                        server: server,
                        success: function() {
                            //서버에 attach
                            janus.attach({
                                plugin: "janus.plugin.videoroom",
                                opaqueId: opaqueId,
                                success: function(pluginHandle) {
                                    sfutest = pluginHandle;
                                    Janus.log("Plugin attached! (" + sfutest.getPlugin() + ", id=" + sfutest.getId() + ")");
                                    Janus.log("  -- This is a publisher/manager");

                                    //방을 생성하고 사용자를 참여시키는 코드
                                    var createRoom = {
                                        request: "create",
                                        room: Number(myroom),
                                        permanent: false,
                                        record: false,
                                        publishers: 6,
                                        bitrate: 128000,
                                        fir_freq: 10,
                                        ptype: "publisher",
                                        description: "test",
                                        is_private: false
                                    };
                                    sfutest.send({ message: createRoom, success: function(result) {
                                            
                                        console.log("Room Create Result: " + result);
                                        console.log("error: " + result["error"]);
                                        room = result["room"];
                                        console.log("Screen sharing session created: " + room);
                                        
                                    var register = { 
                                        request: "join", 
                                        room: Number(myroom), 
                                        ptype: "publisher", 
                                        display: username 
                                    };
                                    var event = result["videoroom"]; 
                                    Janus.debug("Event: " + event);
                                    sfutest.send({"message": register});
                                    Janus.log(username,"참여");
                                    }});
                                    sfutest.createOffer(
                                        Janus.log("offer들어옴"),
                                        {
                                            media:  { audio: true, video: true },
                                            success: function(jsep) {
                                                Janus.debug("Got publisher SDP!offer성공", jsep);
                                                var publish = { request: "configure", audio: true, video: true };
                                                sfutest.send({ message: { request: "configure" }, jsep: jsep })
                                            },
                                            error: function(error) {
                                                Janus.error("WebRTC error:", error);
                                                if(useAudio) {
                                                    publishOwnFeed(false);
                                                } else {
                                                    alert("WebRTC error... " + error.message);
                                                }
                                            }
                                        });
                                            Janus.log("Entered the room!!!!!!", Number(myroom))
                                    },

                                error: function(error) {
									Janus.error("  -- Error attaching plugin...", error);
									//bootbox.alert("Error attaching plugin... " + error);
                                    alert("Error attaching plugin... " + error);
								},
                            //카메라 허용 alert 창
                            consentDialog: function(on) {
                                Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
                                if (on) {
                                    // 방에 조인한 경우에만 실행
                                    alert("비디오를 허용하시겠습니까?");
                                    console.log("카메라 허용");
                                } else {
                                    console.log("카메라 권한 오류")
                                }
                            },
                            //webrtc 연결 설정 프로토콜 로그 기록
                            iceState: function(state) {
                                Janus.log("ICE state changed to " + state);
                            },
                                //미디어 수신 상태 변경 기록
                            mediaState: function(medium, on) {
                                Janus.log("Janus " + (on ? "started" : "stopped") + " receiving our " + medium);
                            },
                                //janus 연결상태 확인
                            webrtcState: function(on) {
                                Janus.log("Janus says this WebRTC PeerConnection");
                            },

                                //비디오 및 사용자 정보 출력
                            onmessage: function(msg, jsep) {
                            },
                                
                            onlocalstream: function(stream) {
                                // The subscriber stream is recvonly, we don't expect anything here
                            },

                            // Janus의 onremotestream 콜백 함수 정의
                            onremotestream: function(stream) {
                                Janus.debug("Remote feed #" + remoteFeed.rfindex + ", stream:", stream);
                                handleRemoteStream(stream, remoteFeed.rfindex);
                            },


                            // oncleanup: function() {
                            // // Handle cleanup
                            //     Janus.log(" ::: Got a cleanup notification: we are unpublished now :::");
                            // }
                                
                            });
                        },
                        error: function(error) {
                            Janus.error(error);
                            //bootbox.alert(error, function() {
                                alert(error, function() {
                                window.location.reload();
                            });
                        },
                        destroyed: function() {
                            window.location.reload();
                        }
                    });
                }
            });
        }
    }, [roomNo, userNick]);

    // Janus 객체를 통해 다른 사용자의 비디오 스트림을 받아온 후 각 비디오 요소에 할당하는 함수
    function handleRemoteStream(stream, index, username) {
        const videoElementId = 'video' + (index + 2); // video2부터 시작하기 위해 index + 2
        const videoElement = document.getElementById(videoElementId);
        if (videoElement) {
            videoElement.srcObject = stream;
            
            // 사용자 이름을 출력
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.font = '16px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText(username, 10, 20); // 사용자 이름을 캔버스에 그립니다.
            const imageData = canvas.toDataURL('image/png');
            videoElement.srcObject = null; // 비디오 요소 초기화
            videoElement.src = imageData; // 캔버스 이미지를 비디오 요소에 설정
        }
    } 

    //게임로직 타임라인 
    useEffect(() => {
        const timerFunction = () => {
            if(onGameState===0){
                const timer1 = setTimeout(() => {
                    //setOnDiePage(0);
                    setOnNormalVote(1);
                    setTimeLineState("마피아 투표시간입니다. 마피아 용의자를 투표해주세요.");
                    console.log("낮투표")
                }, 10000); //60000
        
                const timer2 = setTimeout(() => {
                    //setOnDiePage(1);
                    setOnNormalVote(0);
                    setTimeLineState(`${JSON.stringify(onDiePeople)}이 죽었습니다`);
                    console.log("낮죽음")
                }, 20000); //90000
        
                const timer3 = setTimeout(() => {
                    //setOnDiePage(0);
                    setOnMafiaVote(1);
                    setTimeLineState("마피아의 밤입니다. 마피아는 타켓을 지목해주세요.");
                    console.log("밤투표")
                }, 30000); //100000
        
                const timer4 = setTimeout(() => {
                    //setOnDiePage(1);
                    setOnMafiaVote(0);
                    setTimeLineState(`${JSON.stringify(onDiePeople)}이 죽었습니다`);
                    console.log("밤죽음")
                    
                }, 40000); //130000
        
                const timer5 = setTimeout(() => {
                    //setOnDiePage(0);
                    setTimeLineState("자유 토론");
                    console.log("시민토론")
                }, 50000); //140000
        
                return () => {
                    clearTimeout(timer1);
                    clearTimeout(timer2);
                    clearTimeout(timer3);
                    clearTimeout(timer4);
                    clearTimeout(timer5);
                };
            }
        };
    
        // 최초 실행
        timerFunction();
    
        // 일정 시간 간격으로 반복 실행
        const intervalId = setInterval(() => {
            timerFunction();
        }, 50000);
    
        // 컴포넌트가 언마운트되거나 업데이트되기 전에 clearInterval을 호출하여 메모리 누수를 방지합니다.
        return () => clearInterval(intervalId);
    }, [onDiePeople]);
    

    //투표할때 클릭 관련
    function handleVoteParty(e){
        const newValue = e.target.value;
        const currentValue = selectedParty;
        const isChecked = e.target.checked;

        if(newValue!==currentValue){
            setSelectedParty(newValue);
        }
        else{
            setSelectedParty("");
        }
    }

    //투표(post)
    function submitVote(){
        const data = {
            userId:selectedParty,
            roomNo:roomNo,
        }
        axios.post(`http://localhost:3001/dumi`,data)
        .then(response =>{
            console.log("누구죽음",data.userId);
        })
    }

    //투표 결과 반환(get)
    const fetchVoteResult = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/vote/?roomNo=${roomNo}`);
            const victory = response.data[0].vic;
            if (victory === 0) {
                const dieUserNickNm = response.data[0].dieUserNickNm;
                setOnDiePeople(dieUserNickNm);
            } else {
                setOnGameState(1);
                if (victory === 1) {
                    setWinner(1);
                } else if (victory === 2) {
                    setWinner(2);
                }
            }
        } catch (error) {
            console.error("Error fetching vote result:", error);
        }
    };

    fetchVoteResult();
    
    

    return (
        onGameState === 0 ? ( 
            <div className="onGameBody">
                <div className="timeLineBox">
                    {timeLineState}
                </div>
                <div className="faceBox">
                    {/* {onGameParty.map((onGameParty, index)=>(
                        <div key={index} className="onGamePartyBox">
                            <FaceChat 
                                key={onGameParty.userId}
                                onGameParty={onGameParty}
                                janus={Janus}
                                pluginHandle={pluginHandle}
                            />
                        </div>
                    ))} */}
                        <div className="div1" id="div1">
                            <video className="video1" id="video1" autoPlay playsInline muted></video>
                            <div className="nickBox1" id="nickBox1"></div>
                        </div>
                        <div className="div2" id="div2">
                            <video className="video2" id="video2" autoPlay playsInline muted></video>
                        </div>
                        <div className="div3" id="div3">
                            <video className="video3" id="video3" autoPlay playsInline muted></video>
                        </div>
                        <div className="div4" id="div4">
                            <video className="video4" id="video4" autoPlay playsInline muted></video>
                        </div>
                        <div className="div5" id="div5">
                            <video className="video5" id="video5" autoPlay playsInline muted></video>
                        </div>
                        <div className="div6" id="div6">
                            <video className="video6" id="video6" autoPlay playsInline muted></video>
                        </div>
                    
                </div>
                <div className="roleBox">
                    {onGameParty.map((partyMafia, index)=>(
                        partyMafia.userId===userIdentity?
                        (partyMafia.role===1 ?
                            (<span key={index}>당신은 마피아입니다</span>)
                            :(<span key={index}>당신은 시민입니다</span>)):("")
                    ))}
                </div>
                <div className="voteBox">
                    <div className="partyVoteBox">
                        {onGameParty.map(party =>(
                            <div key={party.userId} className="radioButtonBox">
                                <label className={`customRadioButton ${selectedParty === party.userId ? 'selected' : ''}`}>{party.userNickNm}
                                    <input 
                                        type="radio" 
                                        name="party"
                                        value={party.userId}
                                        checked={selectedParty == party.userId}
                                        onClick={handleVoteParty}
                                        onChange={() => {}}
                                    />
                                </label>
                            </div>   
                        ))}
                    </div>
                    {nowUser.roleSt===0 && ((nowUser.role===1&&onMafiaVote===1)||(onNormalVote===1))?
                    (<div className="voteButtonBox">
                        <Button
                            type="voteButton"
                            text="vote"
                            onClick={submitVote}
                        />
                    </div>):(<div className="voteButtonBox">게임 진행 중..</div>)}
                </div>

                <div className="chatBox">
                    {nowUser.roleSt===0?(
                        <div>죽은 자의 채팅입니다</div>
                    ):(
                        <div className="onChating"></div>
                    )}
                </div>

            </div>

        ):
        (
            <div className="endGamePage">
                {winner===1?(
                    <div className="normalWinner">시민승</div>
                ):(
                    <div className="mafiaWinner">마피아승</div>
                )}
            </div>
        )

    );
}

export default OnGame;
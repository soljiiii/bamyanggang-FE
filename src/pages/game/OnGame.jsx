import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import FaceChat from "../../component/game/FaceChat";
import Button  from "../../component/common/Button";

function OnGame(){
    const {roomNo} = useParams();
    const [onGameInfo,setOnGameInfo] = useState([]);
    const [onGameParty, setOnGameParty] = useState([]);
    const [selectedParty, setSelectedParty] = useState("");
    const [nowUser, setNowUser] = useState([]); //현재 세션 id를 가진 사용자의 정보 
    const [onGameState,setOnGameState] = useState(0); //게임 진행중
    //const [onDiePage, setOnDiePage] = useState(0); //죽음 페이지 띄우기
    const [winner, setWinner] = useState(0); //게임 승자 
    const [onNormalVote, setOnNormalVote] = useState(0); //전체 투표
    const [onMafiaVote, setOnMafiaVote] = useState(0); //마피아 투표
    const [onDiePeople, setOnDiePeople] = useState("");//죽은 사람 받기
    const [timeLineState, setTimeLineState] = useState("자유 토론 시간입니다.");

    const userIdentity = "test1";


    //게임 방에 대한 정보 받아옴
    useEffect(()=>{
        axios.get(`http://localhost:3001/game/?roomNo=${roomNo}`)
        .then (response =>{
            setOnGameInfo(response.data);
        });
    },[roomNo]);

    //참여 user 정보 6개 받아옴
    useEffect(()=>{
        axios.get(`http://localhost:3001/party/?roomNo=${roomNo}`)
        .then(response =>{
            setOnGameParty(response.data);
            for(var i=0; i<response.data.length; i++){
                if(response.data[i].userId === userIdentity){
                    setNowUser(response.data[i])
                }
            }
        })
    },[])

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
            roomNo:onGameInfo[0].roomNo,
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
                    {onGameParty.map((onGameParty, index)=>(
                        <div key={index} className="onGamePartyBox">
                            <FaceChat 
                                onGameParty={onGameParty}
                            />
                        </div>
                    ))}
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
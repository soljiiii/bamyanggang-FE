import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import FaceChat from "../../component/game/FaceChat";
import Button  from "../../component/common/Button";

function OnGame(){
    const{roomNo} = useParams();
    const [onGameInfo,setOnGameInfo] = useState([]);
    const [onGameParty, setOnGameParty] = useState([]);
    const [selectedParty, setSelectedParty] = useState("");

    //게임 방에 대한 정보 받아옴
    useEffect(()=>{
        axios.get(`http://localhost:3001/game/?roomNo=${roomNo}`)
        .then (response =>{
            setOnGameInfo(response.data);
        });
    },[roomNo]);

    console.log(onGameInfo)

    //참여 user 정보 6개 받아옴
    useEffect(()=>{
        axios.get(`http://localhost:3001/party/?roomNo=${roomNo}`)
        .then(response =>{
            setOnGameParty(response.data);
        })
    },[])

    console.log("party",onGameParty)

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
    
    console.log("누구투표?:",selectedParty);

    return (
        <div className="onGameBody">
            <div className="faceBox">
                {onGameParty.map((onGameParty, index)=>(
                    <div key={index} className="onGamePartyBox">
                        <FaceChat 
                            onGameParty={onGameParty}
                        />
                    </div>
                ))}
            </div>
            <div className="roleBox"></div>
            <div className="voteBox">
                <div className="partyVoteBox">
                    {onGameParty.map(party =>(
                        <div key={party.userId} className="radioButtonBox">
                            <label className={`customRadioButton ${selectedParty === party.userNickNm ? 'selected' : ''}`}>{party.userNickNm}
                                <input 
                                    type="radio" 
                                    name="party"
                                    value={party.userNickNm}
                                    checked={selectedParty == party.userNickNm}
                                    onClick={handleVoteParty}
                                />
                            </label>
                        </div>   
                    ))}
                </div>
            <div className="voteButtonBox">
                <Button
                    type="voteButton"
                    text="vote"
                    //onClick={}
                />
            </div>
            </div>
            <div className="chatBox"></div>
        </div>
    );
}

export default OnGame;
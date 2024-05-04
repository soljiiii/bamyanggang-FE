import React, {useEffect, useState} from 'react';
import Stomp from '@stomp/stompjs';

function GameSideChat({roomNo, nowUser}){
    const userNicknm = nowUser.userNicknm;
    const [roomId, setRoomId] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    // 메시지 전송
    const sendMessage = () => {
        if (!roomId) return;
        const wsConnect = new WebSocket('ws://localhost/ws-bamyanggang');
        const bamyanggangClient = Stomp.over(wsConnect);
        bamyanggangClient.connect({}, () => {
            bamyanggangClient.send('/sendMessage', {}, JSON.stringify({roomId, sender: userNicknm, message}));
            /* 구독한 메시지가 들어올 자리 */
            bamyanggangClient.subscribe('/sub/' + roomId, (message) => {
                const message = JSON.parse(message.body);
                setMessage(preMessage => [...preMessage, message]);
            });
            setMessage('');
        });
    }

    // 최초 렌더링 시 실행
    useEffect(()=> {
        const wsConnect = new WebSocket('ws://localhost/ws-bamyanggang');
        const bamyanggangClient = Stomp.over(wsConnect);
        const connectCallback = () => {
            console.log('초기연결 성공!');
            const userNicknmList = [];
            userNicknmList.push(userNicknm);
            bamyanggangClient.send('/createChatRoom', {}, JSON.stringify({roomNo}), (response) => {
                const {roomId} = JSON.parse(response.body);
                console.log('서버로부터 받은 roomId : ', roomId);
                setRoomId(roomId);
                bamyanggangClient.send('joinChatRoom', {}, JSON.stringify({roomId, userNicknmList}), (response) => {
                    const {userNicknmList} = JSON.parse(response.body);
                    console.log('서버로부터 받은 userNicknmList : ', userNicknmList);
                });
            });
        };
        const errorCallback= () => {
            console.log('연결 실패ㅠ');
        };

        bamyanggangClient.connect({}, connectCallback, errorCallback);

        return () => {
            if(bamyanggangClient && roomId) {
                const userNicknmList = [];
                userNicknmList.push(userNicknm);
                bamyanggangClient.send('/exitChatRoom', {}, JSON.stringify({roomId, userNicknmList}));
                bamyanggangClient.disconnect(); 
            }
        }
    },[]);


    return(
        <div className="chatBox">
            <div>
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <span>{userNicknm}: </span>
                        <span>{msg.message}</span>
                    </div>
                ))}
            </div>
            <div>
            <input type = "test" value = {message} onChange={(e) => setMessage(e.target.value)} placeholder='메시지를 입력하세요.'/>
            <button onClick = {sendMessage}>send</button>
            </div>
        </div>
    );
}

export default GameSideChat;
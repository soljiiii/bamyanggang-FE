import React, {useEffect, useState} from 'react';
import {Stomp} from '@stomp/stompjs';

function GameSideChat({roomNo, userNick}){
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [chatClient, setChatClient] = useState('');
    
    // 최초 렌더링 시 방 생성 후 방 입장(구독)
    if(!chatClient) {
        const webSocket = new WebSocket('ws://localhost/ws-bamyanggang');
        const stomp = Stomp.over(()=>webSocket);
        const connectCallback = () => {
            console.log('서버연결 성공!');
            console.log('roomNo : ',roomNo);
            stomp.send('/pub/createChatRoom', {}, JSON.stringify({roomNo}));
            console.log('방생성 성공!');
            stomp.send('/pub/joinChatRoom', {}, JSON.stringify({roomNo}));
            console.log('방입장 성공!');
            stomp.subscribe('/sub/' + roomNo, (message)=>{
                const receive = JSON.parse(message.body);
                const newMessage = {
                    userNick : receive.userNick,
                    message : receive.message
                };
                console.log(newMessage);
                setMessages(preMessages => [...preMessages, newMessage]);
                setMessage('');
            });
        };
        const errorCallback = () => {
            console.log('서버연결 실패ㅠ');
        };
        stomp.connect({}, connectCallback, errorCallback);
        
        setChatClient(stomp);
    };
        
    // enter 이벤트 핸들러
    const enter = (event) => {
        if (event.key === 'Enter') {
            communication();
        }
    }
    // 통신
    const communication = () => {
        if (!chatClient) {
            console.error('[chatClient]가 존재하지 않습니다.');
            return;
        }
        chatClient.send('/pub/sendMessage', {}, JSON.stringify({roomNo, userNick, message}));
    };
    

    return(
        <div className="chatBox">
            <div>
                {messages.map((object, index) => (
                    <div key={index}>
                        <span>{object.userNick}: </span>
                        <span>{object.message}</span>
                    </div>
                ))}
            </div>
            <div>
            <input type = "text" value = {message} onChange={(e) => setMessage(e.target.value)} onKeyDown = {enter} placeholder='메시지를 입력하세요.'/>
            <button onClick = {communication}>send</button>
            </div>
        </div>
    );
}

export default GameSideChat;
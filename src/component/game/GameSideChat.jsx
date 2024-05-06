import React, {useState} from 'react';
import {Stomp} from '@stomp/stompjs';

function GameSideChat({roomNo, userNick}){
    const [chatClient, setChatClient] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    //
    // 최초 렌더링 시 방 생성, 방 입장, 구독 (chatClient가 없을 때만 실행)
    if (!chatClient) {
        // 서버 연결
        const webSocket = new WebSocket('ws://localhost/ws-bamyanggang');
        console.log('서버 연결 성공!');
        // stomp 클라이언트 생성
        const stomp = Stomp.over(() => webSocket);
        console.log('클라이언트 생성 성공!');

        const connectCallback = () => {
            // 채팅방 생성 요청
            stomp.send('/pub/createChatRoom', {}, JSON.stringify({roomNo}));
            console.log('채팅방 생성 성공!');
            // 채팅방 입장 요청
            stomp.send('/pub/joinChatRoom', {}, JSON.stringify({roomNo}));
            console.log('채팅방 입장 성공!');
            // 채팅방 구독 요청
            stomp.subscribe('/sub/' + roomNo, (message)=>{
                // 메시지 수신 시 콜백 함수
                const receive = JSON.parse(message.body);
                const newMessage = {
                    userNick : receive.userNick,
                    message : receive.message
                };
                // 메시지 목록에 수신 한 메시지를 추가
                setMessages(preMessages => [...preMessages, newMessage]);
                // Message 상태 초기화 (입력창을 비우기 위해서)
                setMessage('');
            });
        };

        const errorCallback = () => {
            console.error('서버연결 실패ㅠ');
        };

        // stomp 클라이언트가 서버에 연결되었다면 connectCallback함수를 연결되지 않았다면 errorCallback함수를 호출
        stomp.connect({}, connectCallback, errorCallback);
        
        // chatClient 상태 변경
        setChatClient(stomp);
    };
    
    // 송신
    const sendMessage = () => {
        // chatClient가 존재하지 않으면 실행하지 않는다.
        if (!chatClient) {
            console.error('[chatClient]가 존재하지 않습니다.');
            return;
        }

        // 메시지 송신 요청
        chatClient.send('/pub/sendMessage', {}, JSON.stringify({roomNo, userNick, message}));
    };

    // 키보드 이벤트 핸들러 (enter키를 눌렀을 때 메시지 송신)
    const enter = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return(
        <div className="chatBox">
            <div>
                {messages.map((object, index) => (
                    <div key={index}>
                        <span>{object.userNick} : </span>
                        <span>{object.message}</span>
                    </div>
                ))}
            </div>
            <div>
            <input type = "text" value = {message} onChange = {(e) => setMessage(e.target.value)} onKeyDown = {enter} placeholder = '메시지를 입력하세요.'/>
            <button onClick = {sendMessage}>send</button>
            </div>
        </div>
    );
}

export default GameSideChat;
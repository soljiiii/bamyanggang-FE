import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyPage = () => {
    const [userData, setUserData] = useState({
        user_id: '',
        user_pw: '',
        user_nm: '',
        user_nicknm: '',
        user_tel1: '',
        user_tel2: '',
        user_tel3: '',
        user_email1: '',
        user_email2: '',
        user_birth: '',
        user_gender: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // 모든 사용자 데이터 불러오기 (예시로 첫 번째 사용자 데이터 사용)
                const response = await axios.get(`http://localhost:3001/member`);
                if (response.data && response.data.length > 0) {
                    setUserData(response.data[0]);  // 첫 번째 사용자 데이터를 state에 저장
                } else {
                    console.error('사용자 데이터가 없습니다.');
                }
            } catch (error) {
                console.error('회원 데이터를 불러오는 데 실패했습니다.', error);
            }
        };

        fetchUserData(); // 함수를 호출하여 데이터를 가져옴
    }, []); // 빈 의존성 배열을 사용하여 컴포넌트 마운트 시 한 번만 실행

    return (
        <div>
            <h1>마이 페이지</h1>
            <div>
                <p>아이디: {userData.user_id}</p>
                <p>이름: {userData.user_nm}</p>
                <p>닉네임: {userData.user_nicknm}</p>
                <p>전화번호: {`${userData.user_tel1}-${userData.user_tel2}-${userData.user_tel3}`}</p>
                <p>이메일: {`${userData.user_email1}@${userData.user_email2}`}</p>
                <p>생년월일: {userData.user_birth}</p>
                <p>성별: {userData.user_gender}</p>
            </div>
            <button onClick={() => alert('회원정보 수정 기능 준비 중')}>회원정보 수정</button>
            <button onClick={() => alert('회원탈퇴 기능 준비 중')}>회원탈퇴</button>
        </div>
    );
};

export default MyPage;
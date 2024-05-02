import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyPage = () => {
    const [userData, setUserData] = useState({
        userId: '',
        userPw: '',
        userNm: '',
        userNicknm: '',
        userTel1: '',
        userTel2: '',
        userTel3: '',
        userEmail1: '',
        userEmail2: '',
        userBirth: '',
        userGender: ''
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
                <p>아이디: {userData.userId}</p>
                <p>이름: {userData.userNm}</p>
                <p>닉네임: {userData.userNicknm}</p>
                <p>전화번호: {`${userData.userTel1}-${userData.userTel2}-${userData.userTel3}`}</p>
                <p>이메일: {`${userData.userEmail1}@${userData.userEmail2}`}</p>
                <p>생년월일: {userData.userBirth}</p>
                <p>성별: {userData.userGender}</p>
            </div>
            <button type="button" onClick={() => navigate('/MemberModify')}>회원수정</button>
            <button onClick={() => alert('회원탈퇴 되었습니다')}>회원탈퇴</button>
        </div>
    );
};

export default MyPage;
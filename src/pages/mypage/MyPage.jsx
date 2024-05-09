import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyPage.css'; // CSS 파일 import

const MyPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null); // 사용자 정보를 상태로 관리

    useEffect(() => {
        // 로컬 스토리지에서 사용자 정보 가져오기
        const storedUserData = JSON.parse(localStorage.getItem('user'));
        setUserData(storedUserData);
    }, []);

    const handleModify = () => {
        if (userData) {
            navigate(`/memberModify/${userData.userId}`); // 사용자 아이디를 동적으로 URL에 추가하여 회원 수정 페이지로 이동
        }
    };

    const handleDelete = () => {
        navigate('/memberDelete'); // 회원 탈퇴 페이지로 이동
    };

    const handleReLogin = () => {
        const accessToken = localStorage.getItem('access');
        if (accessToken) {
            axios.post('http://localhost/api/reissue', { withCredentials: true })
                .then(response => {
                    const newAccessToken = response.headers['refresh'];
                    localStorage.setItem('access', newAccessToken);
                    console.log('토큰 재발급 요청 성공');
                })
                .catch(error => {
                    console.error('토큰 재발급 요청 실패:', error);
                });
        } else {
            console.log('Access 토큰이 없습니다.');
        }
    };

    if (!userData) {
        return <div>Loading...</div>; // 데이터 로딩 중
    }

    return (
        <>
        <h2 className="mypage-title">마이 페이지</h2>
            <div className='mypage-container'>
                <div className='info'>
                    <p className='ui'>아이디: {userData.userId}</p>
                    <p className='un'>이름: {userData.userName}</p>
                    <p className='unn'>닉네임: {userData.nickName}</p>
                    <p className='utel'>전화번호: {`${userData.phoneNum1}-${userData.phoneNum2}-${userData.phoneNum3}`}</p>
                    <p className='uemail'>이메일: {`${userData.emailNum1}@${userData.emailNum2}`}</p>
                    <p className='ubirth'>생년월일: {userData.birth}</p>
                    <p className='ugender'>성별: {userData.gender}</p>
                </div>
                <button className='btn0' type="button" onClick={handleModify}>회원수정</button>
                <button className='btn0' type="button" onClick={handleDelete}>회원탈퇴</button>
                <button className='btn0' type="button" onClick={handleReLogin}>로그아웃</button>
            </div>
        </>
    );
};

export default MyPage;

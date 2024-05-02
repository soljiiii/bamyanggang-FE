import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [credentials, setCredentials] = useState({ user_id: '', user_pw: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://localhost:3001/member?user_id=' + credentials.user_id + '&user_pw=' + credentials.user_pw);
            if (response.data.length > 0) {
                localStorage.setItem('user', JSON.stringify(response.data[0]));  // 사용자 정보를 로컬 스토리지에 저장
                alert('로그인 성공');
                navigate('/MyPage');  // MyPage로 리다이렉션
            } else {
                setError('로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('로그인 처리 중 에러 발생:', error);
            setError('로그인 처리 중 문제가 발생했습니다.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>로그인</h1>
                <div>
                    <label htmlFor="user_id">아이디:</label>
                    <input
                        type="text"
                        name="user_id"
                        id="user_id"
                        value={credentials.user_id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="user_pw">비밀번호:</label>
                    <input
                        type="password"
                        name="user_pw"
                        id="user_pw"
                        value={credentials.user_pw}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">로그인</button>
                <button type="button" onClick={() => navigate('/MemberJoin')}>회원가입</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Login;

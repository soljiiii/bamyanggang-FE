import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    // const [userId, setUserId] = useState('')
    const [credentials, setCredentials] = useState({ userId: '', userPw: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // console.log(userId);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
     //   setUserId(e.target.value);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>로그인</h1>
                <div>
                    <label htmlFor="userId">아이디:</label>
                    <input
                        type="text"
                        name="userId"
                        id="userId"
                        value={credentials.userId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="userPw">비밀번호:</label>
                    <input
                        type="password"
                        name="userPw"
                        id="userPw"
                        value={credentials.userPw}
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

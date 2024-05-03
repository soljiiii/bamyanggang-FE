import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


function Login() {
    const [credentials, setCredentials] = useState({ userId: '', userPw: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    //쿠키 가져오기
    const [cookies, setCookie] =useCookies(['refreshToken']);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
            const response = await axios.post('localhost://login',{
                userId : credentials.userId,
                userPw : credentials.userPw
            });

            if (response.status === 200 && response.data){
                const accessToken = response.data.access;
                const refreshToken = response.data.refresh;

                console.log(accessToken);
                console.log(refreshToken);

                localStorage.setItem('accessToken', accessToken);
                setCookie('refreshToken', refreshToken);

                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken};`
                alert('로그인 성공');

                navigate('/');  // MyPage로 리다이렉션

            } else if(response.status === 401){
                setError('재 로그인이 필요합니다.');

            }else{
                 console.error('로그인 처리 중 에러 발생:', error);
                 setError('로그인 처리 중 문제가 발생했습니다.');
            }
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

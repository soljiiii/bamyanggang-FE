import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import {Link} from "react-router-dom";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post('/api/login', credentials , 

               
                );
                
                if (response.status === 200) {
                    
                    const access = response?.headers['authorization']; // JWT 토큰 받기
                    console.log(response.headers);
                    console.log(access);
                    localStorage.setItem('access', access); // 토큰을 로컬 스토리지에 저장
                    
                    const userInfoResponse = await axios.get(`/api/userInfo/${credentials.userId}`);

                    console.log(userInfoResponse);
                    const userData = userInfoResponse.data; // 서버에서 받은 사용자 데이터
                    localStorage.setItem('user', JSON.stringify(userData));
              
                    alert('로그인 성공');
                    navigate('/', { state: { user: userData } }); // MyPage로 리다이렉션
                    return; // 성공 시 함수 종료
                }
            
            // 에러 처리
            setError('로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.');
        } catch (error) {
            console.error('로그인 처리 중 에러 발생:', error);
            setError('로그인 처리 중 문제가 발생했습니다.');
        }
    };
    return (
        <>
                    <div className="header-left">
                        <div className="MainButton">
                            <Link to="/"><img src="/images-jsx/밤양갱_white.svg" className="mainImage" alt="Main" /></Link>
                        </div>
                    </div>
        <h2 className="login-title">로그인</h2>

            <form className='loginform' onSubmit={handleSubmit}>
                <div>
                    {/* <label htmlFor="userId">아이디</label> */}
                    <input className='text'
                        type="text"
                        name="userId"
                        id="userId"
                        placeholder='아이디'
                        value={credentials.userId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    {/* <label htmlFor="userPw">비밀번호</label> */}
                    <input className='text2'
                        type="password"
                        name="userPw"
                        id="userPw"
                        placeholder='비밀번호'
                        value={credentials.userPw}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className='btn2' >로그인</button>
                {error && <p className="error">{error}</p>}
            </form>

                <div className='join-area'>
                    <button type="button" className='btn3' onClick={() => navigate('/MemberJoin')}>회원가입</button>
                </div>
        </>
    );
}

export default Login;
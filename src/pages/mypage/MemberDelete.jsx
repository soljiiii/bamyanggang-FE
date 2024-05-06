import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MemberDelete.css';

const MemberDelete = () => {
    const [credentials, setCredentials] = useState({ userId: '', passWd: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:80/deletemember`, {
                data: credentials // 요청 본문에 회원 정보를 포함하여 보냄
            });
            if (response.status === 200) {
                alert('회원 탈퇴되었습니다.');
                navigate('/login');
            } else {
                alert('회원 탈퇴에 실패했습니다.');
            }
        } catch (error) {
            alert('회원 탈퇴 처리 중 오류가 발생했습니다.');
            console.error('회원 탈퇴 처리 중 에러 발생:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>회원 탈퇴</h1>
            <div>
                <label>아이디:</label>
                <input type="text" name="userId" value={credentials.userId} onChange={handleChange} required />
            </div>
            <div>
                <label>비밀번호:</label>
                <input type="password" name="passWd" value={credentials.passWd} onChange={handleChange} required />
            </div>
            <button type="submit">회원 탈퇴</button>
        </form>
    );
};


export default MemberDelete;
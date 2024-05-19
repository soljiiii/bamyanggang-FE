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

            const response = await axios.delete(`/api/deletemember`, {

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
        <>
        <h2 class="delete-title">회원탈퇴</h2>
        <form className='dform' onSubmit={handleSubmit}>
            <div>
                <input className='didcheck' type="text" name="userId" value={credentials.userId} onChange={handleChange} placeholder='로그인' required />
            </div>
            <div>
                <input className='dpwcheck' type="password" name="passWd" value={credentials.passWd} onChange={handleChange} placeholder='비밀번호' required />
            </div>
            <button className='dbtn' type="submit">회원 탈퇴</button>
        </form>
        </>
    );
};


export default MemberDelete;
import React, { useState } from 'react';
import axios from 'axios';
import './MemberJoin.css';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 사용

const MemberJoin = () => {
    const [userId, setUserId] = useState('')
    const [formData, setFormData] = useState({
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
        userGender: 'Male'  // 기본값 설정
    });
    const [errors, setErrors] = useState({});
    const [checking, setChecking] = useState({});
    const navigate = useNavigate(); // 페이지 이동을 위한 훅 사용

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        setUserId(e.target.value);

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleGenderSelect = (gender) => {
        setFormData(prev => ({
            ...prev,
            userGender: gender
        }));
    };

    const checkDuplicate = async (field) => {
        alert(field);
        if (!formData[field]) {
            setErrors(prev => ({ ...prev, [field]: '중복확인을 위해서 빈칸으로 둘 수 없습니다' }));
            return;
        }
        setChecking(prev => ({ ...prev, [field]: true }));
        try {
            const response = await axios.post('http://localhost:3001/member', {
                field: field,
                value: formData[field]
            });
            if (response.data.isDuplicate) {
                setErrors(prev => ({ ...prev, [field]: `${field} 다른 사용자가 사용중입니다.` }));
            } else {
                setErrors(prev => ({ ...prev, [field]: null }));
            }
        } catch (error) {
            setErrors(prev => ({ ...prev, [field]: '실패하였습니다 다시 시도해주세요' }));
        } finally {
            setChecking(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/member', formData);
            console.log (response.data)
            console.log (response.status)
            if (response.status === 201) {
                alert('회원가입 성공');
                navigate('/login'); // 로그인 페이지로 이동
            } else {
                console.log('회원가입 실패:', response.data.message);
            }
        } catch (error) {
            console.error('회원가입 처리 중 에러 발생:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>회원가입</h1>
            <div className="userContainer">
                <input type="text" name="userId" value={formData.userId} onChange={handleChange} placeholder="아이디" />
                <button  type="button" onClick={() => checkDuplicate({userId})} disabled={checking.userId}>중복확인</button>
                {errors.userId && <p className="error-message">{errors.userId}</p>}
                <input type="password" name="userPw" value={formData.userPw} onChange={handleChange} placeholder="비밀번호" />
                {errors.userPw && <p className="error-message">{errors.userPw}</p>}
            </div>
            <div className="infoContainer">
                <input type="text" name="userNm" value={formData.userNm} onChange={handleChange} placeholder="이름" />
                {errors.userNm && <p className="error-message">{errors.userNm}</p>}
                <input type="text" name="userNicknm" value={formData.userNicknm} onChange={handleChange} placeholder="닉네임" />
                <button onClick={() => checkDuplicate('userNicknm')} disabled={checking.userNicknm}>중복확인</button>
                {errors.userNicknm && <p className="error-message">{errors.userNicknm}</p>}
                <input type="date" name="userBirth" value={formData.userBirth} onChange={handleChange} />
                {errors.userBirth && <p className="error-message">{errors.userBirth}</p>}
                <div className='email-container'>
                    <input type="text" name="userEmail1" value={formData.userEmail1} onChange={handleChange} placeholder="이메일 앞부분" />
                    <span>@</span>
                    <input type="text" name="userEmail2" value={formData.userEmail2} onChange={handleChange} placeholder="이메일 뒷부분" />
                </div>
                <div className='phonenum'>
                    <input type="text" name="userTel1" maxLength="3" value={formData.userTel1} onChange={handleChange} placeholder="전화번호1" />
                    -
                    <input type="text" name="userTel2" maxLength="4" value={formData.userTel2} onChange={handleChange} placeholder="전화번호2" />
                    -
                    <input type="text" name="userTel3" maxLength="4" value={formData.userTel3} onChange={handleChange} placeholder="전화번호3" />
                </div>
            </div>
            <div className="genderContainer">
                <button type="button" onClick={() => handleGenderSelect('Male')} className={`genderOption ${formData.userGender === 'Male' ? 'selected' : ''}`}>
                    남자
                </button>
                <button type="button" onClick={() => handleGenderSelect('Female')} className={`genderOption ${formData.userGender === 'Female' ? 'selected' : ''}`}>
                    여자
                </button>
            </div>
            <button type="submit">회원가입</button>
        </form>
    );
};

export default MemberJoin;
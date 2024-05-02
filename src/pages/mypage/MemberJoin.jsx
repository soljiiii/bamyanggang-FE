import React, { useState } from 'react';
import axios from 'axios';
import './MemberJoin.css';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 사용

const MemberJoin = () => {
    const [formData, setFormData] = useState({
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
        user_gender: 'Male'  // 기본값 설정
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
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleGenderSelect = (gender) => {
        setFormData(prev => ({
            ...prev,
            user_gender: gender
        }));
    };

    const checkDuplicate = async (field) => {
        if (!formData[field]) {
            setErrors(prev => ({ ...prev, [field]: '중복확인을 위해서 빈칸으로 둘 수 없습니다' }));
            return;
        }
        setChecking(prev => ({ ...prev, [field]: true }));
        try {
            const response = await axios.post('http://localhost:3001/member/check-duplicate', {
                field: field,
                value: formData[field]
            });
            if (response.data.isDuplicate) {
                setErrors(prev => ({ ...prev, [field]: `${field} is already in use.` }));
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
                <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="아이디" />
                <button onClick={() => checkDuplicate('user_id')} disabled={checking.user_id}>중복확인</button>
                {errors.user_id && <p className="error-message">{errors.user_id}</p>}
                <input type="password" name="user_pw" value={formData.user_pw} onChange={handleChange} placeholder="비밀번호" />
                {errors.user_pw && <p className="error-message">{errors.user_pw}</p>}
            </div>
            <div className="infoContainer">
                <input type="text" name="user_nm" value={formData.user_nm} onChange={handleChange} placeholder="이름" />
                {errors.user_nm && <p className="error-message">{errors.user_nm}</p>}
                <input type="text" name="user_nicknm" value={formData.user_nicknm} onChange={handleChange} placeholder="닉네임" />
                <button onClick={() => checkDuplicate('user_nicknm')} disabled={checking.user_nicknm}>중복확인</button>
                {errors.user_nicknm && <p className="error-message">{errors.user_nicknm}</p>}
                <input type="date" name="user_birth" value={formData.user_birth} onChange={handleChange} />
                {errors.user_birth && <p className="error-message">{errors.user_birth}</p>}
                <div className='email-container'>
                    <input type="text" name="user_email1" value={formData.user_email1} onChange={handleChange} placeholder="이메일 앞부분" />
                    <span>@</span>
                    <input type="text" name="user_email2" value={formData.user_email2} onChange={handleChange} placeholder="이메일 뒷부분" />
                </div>
                <div className='phonenum'>
                    <input type="text" name="user_tel1" maxLength="3" value={formData.user_tel1} onChange={handleChange} placeholder="전화번호1" />
                    -
                    <input type="text" name="user_tel2" maxLength="4" value={formData.user_tel2} onChange={handleChange} placeholder="전화번호2" />
                    -
                    <input type="text" name="user_tel3" maxLength="4" value={formData.user_tel3} onChange={handleChange} placeholder="전화번호3" />
                </div>
            </div>
            <div className="genderContainer">
                <button type="button" onClick={() => handleGenderSelect('Male')} className={`genderOption ${formData.user_gender === 'Male' ? 'selected' : ''}`}>
                    남자
                </button>
                <button type="button" onClick={() => handleGenderSelect('Female')} className={`genderOption ${formData.user_gender === 'Female' ? 'selected' : ''}`}>
                    여자
                </button>
            </div>
            <button type="submit">회원가입</button>
        </form>
    );
};

export default MemberJoin;
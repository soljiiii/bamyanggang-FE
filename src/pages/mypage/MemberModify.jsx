import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MemberModify.css'; // 같은 스타일을 사용한다고 가정

const MemberModify = () => {
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
        user_gender: 'Male' // 기본값 설정
    });
    const [errors, setErrors] = useState({});
    const [checking, setChecking] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // 사용자 데이터 로딩
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5173/api/user-data');
                setFormData(response.data); // 응답 데이터로 폼 데이터 설정
                setIsLoaded(true);
            } catch (error) {
                console.error('데이터 로딩 중 오류 발생:', error);
            }
        };
        fetchData();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5173/api/update-user', formData);
            if (response.data.success) {
                console.log('회원 수정 성공');
            } else {
                console.log('회원 수정 실패:', response.data.message);
            }
        } catch (error) {
            console.error('회원 수정 처리 중 에러 발생:', error);
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>회원 수정</h1>
            <div className="userContainer">
                <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} placeholder="아이디" disabled />
                <input type="password" name="user_pw" value={formData.user_pw} onChange={handleChange} placeholder="새 비밀번호" />
                {errors.user_pw && <p className="error-message">{errors.user_pw}</p>}
            </div>
            <div className="infoContainer">
                <input type="text" name="user_nm" value={formData.user_nm} onChange={handleChange} placeholder="이름" />
                <input type="text" name="user_nicknm" value={formData.user_nicknm} onChange={handleChange} placeholder="닉네임" />
                <input type="date" name="user_birth" value={formData.user_birth} onChange={handleChange} />
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
            <button type="submit">회원 정보 수정</button>
        </form>
    );
};

export default MemberModify;
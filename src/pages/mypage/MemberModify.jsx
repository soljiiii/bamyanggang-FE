import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './MemberModify.css';
import {Link} from "react-router-dom";

const MemberModify = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: '',
        passWd: '', // userPw를 passWd로 변경
        userName: '', // userNm를 userName으로 변경
        nickName: '', // userNicknm을 nickName으로 변경
        phoneNum1: '', // userTel1을 phoneNum1으로 변경
        phoneNum2: '', // userTel2를 phoneNum2으로 변경
        phoneNum3: '', // userTel3을 phoneNum3으로 변경
        emailNum1: '', // userEmail1을 emailNum1으로 변경
        emailNum2: '', // userEmail2을 emailNum2으로 변경
        userBirth: '',
        userGender: 'M'
    });
    const [errors, setErrors] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/userInfo/${userId}`); // 수정된 URL

                if (response.data) {
                    setFormData(response.data);
                    setIsLoaded(true);
                }
            } catch (error) {
                console.error('데이터 로딩 중 오류 발생:', error);
            }
        };
        fetchData();
    }, [userId]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/update/${userId}`, formData); // 수정된 URL

            if (response.status === 200) {
                alert('회원 정보가 수정되었습니다.');
                navigate('/myPage'); // 수정이 성공하면 마이 페이지로 이동
            } else {
                console.error('회원 정보 수정 실패:', response.data.message);
            }
        } catch (error) {
            console.error('회원 정보 수정 처리 중 에러 발생:', error);
        }
    };

  /*   if (!isLoaded) {
        return <div>Loading...</div>; // 데이터 로딩 중
    } */

    return (
        <>
        <div className="header-left">
            <div className="MainButton">
                <Link to="/"><img src="/images-jsx/밤양갱_white.svg" className="mainImage" alt="Main" /></Link>
            </div>
        </div>

        <h2 class="modify-title">회원수정</h2>
        <form onSubmit={handleSubmit} className="form-container">
            <div className="userContainer">
                <p>아이디:</p>
                <input type="text" name="userId" value={formData.userId} onChange={handleChange} placeholder="아이디" className='mui'/>
                <p>비밀번호:</p>
                <input type="password" name="passWd" value={formData.passWd} onChange={handleChange} placeholder="새 비밀번호" className='mup'/>
                {errors.passWd && <p className="error-message">{errors.passWd}</p>}
            </div>
            <div className="infoContainer">
                <p>이름:</p>
                <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="이름" className='mun'/>
                <p>닉네임:</p>
                <input type="text" name="nickName" value={formData.nickName} onChange={handleChange} placeholder="닉네임" className='munn'/>
                <p>생년월일:</p>
                <input type="date" name="userBirth" value={formData.userBirth} onChange={handleChange} placeholder="생년월일" className='mub'/>
                <div className="email-container">
                    <p>이메일:</p>
                    <input type="text" name="emailNum1" value={formData.emailNum1} onChange={handleChange} placeholder="이메일" className='mue1'/>
                    <span>@</span>
                    <input type="text" name="emailNum2" value={formData.emailNum2} onChange={handleChange}  className='mue2'/>
                </div>
                <div className="phonenum">
                    <p>전화번호:</p>
                    <input type="text" name="phoneNum1" maxLength="3" value={formData.phoneNum1} onChange={handleChange}  className='pn1' />
                    -
                    <input type="text" name="phoneNum2" maxLength="4" value={formData.phoneNum2} onChange={handleChange} className='pn2'/>
                    -
                    <input type="text" name="phoneNum3" maxLength="4" value={formData.phoneNum3} onChange={handleChange}  className='pn3'/>
                </div>
            </div>
            <div className="genderContainer">
                <button type="button" onClick={() => setFormData({ ...formData, userGender: 'Male' })} className={`genderOption ${formData.userGender === 'Male' ? 'selected' : ''}`}>
                    남자
                </button>
                <button type="button" onClick={() => setFormData({ ...formData, userGender: 'Female' })} className={`genderOption ${formData.userGender === 'Female' ? 'selected' : ''}`}>
                    여자
                </button>
            </div>
            <button className='mbtn' type="submit">회원 정보 수정</button>
        </form>
        </>
    );
};

export default MemberModify;
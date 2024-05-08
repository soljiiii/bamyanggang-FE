import  { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import "./MemberJoin.css";


function MemberJoin(props) {
const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNum1, setPhoneNumber1] = useState("");
  const [phoneNum2, setPhoneNumber2] = useState("");
  const [phoneNum3, setPhoneNumber3] = useState("");
  const [emailNum1, setEmailNum1] = useState("");
  const [emailDomain, setEmailDomain] = useState("gmail.com"); // 기본값 설정
  const [emailDomainInput, setEmailDomainInput] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(null);
  const [isEmailAvailable, setIsEmailAvailable] = useState(null);
  const [isNickNameAvailable, setIsNickNameAvailable] = useState(null);
  const [isPhoneNumAvailable, setIsPhoneNumAvailable] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");

  const emailDomains = ["gmail.com", "naver.com", "hotmail.com", "yahoo.com", "직접입력"];

  const handleProfileImageChange = event => {
    const selectedFile = event.target.files[0];
    setProfileImage(selectedFile);
  };

  const handlePhoneNumberChange = (event, setter) => {
    let value = event.target.value.replace(/\D/g, ''); // 숫자 이외의 문자 제거
    // 최대 3자리까지만 허용  
    value = value.substring(0, 3);
    setter(value);
  };
  

  const handlePhoneNumberChange2 = (event, setter) => {
    let value = event.target.value.replace(/\D/g, '');
    setter(value);
    
  };

  const handlePhoneNumberChange3 = (event, setter) => {
    let value = event.target.value.replace(/\D/g, '');
    setter(value);
    
  };

  const handleEmailDomainChange = event => {
    const value = event.target.value;
    if (value === "직접입력") {
      setEmailDomain("");
      setEmailDomainInput(true);
    } else {
      setEmailDomain(value);
      setEmailDomainInput(false);
    }
  };

  const handleIdChange = event => {
    setUserId(event.target.value);
    setIsIdAvailable(null);
  };
// ID 유효성 검사 
  const handleCheckIdAvailability = async () => {
    try {
      const response = await axios.post('http://localhost:80/checkIdAvailability/idCheck', userId); 
    console.log('응답 값:', response.data);
    setIsIdAvailable(response.data);

      console.log('응답 값:', response.data);
      setIsIdAvailable(response.data);
  
      // 중복 확인 결과에 따라 메시지를 표시합니다.
      if (response.data === 0) {
        alert("사용 가능한 아이디입니다.");
      } else if (response.data === 1)  {
        alert("이미 사용 중인 아이디입니다.");
      }
    } catch (error) {
      console.error('Error occurred while checking ID availability:', error);
    }
  };
// email 유효성 검사
  const handleCheckEmailAvailability = async () => {
    try {
      const response = await axios.post('http://localhost:80/checkIdAvailability/emailCheck', emailNum1); 
    console.log('응답 값:', response.data);
    setIsIdAvailable(response.data);

      console.log('응답 값:', response.data);
      setIsIdAvailable(response.data);
  
      // 중복 확인 결과에 따라 메시지를 표시합니다.
      if (response.data === 0) {
        alert("사용 가능한 이메일입니다.");
      } else if (response.data >= 1)  {
        alert("이미 사용 중인 이메일입니다.");
      }
    } catch (error) {
      console.error('Error occurred while checking ID availability:', error);
    }
  };
// nickname 유효성 검사.
  const handleCheckNickNameAvailability = async () => {
    try {
      const response = await axios.post('http://localhost:80/checkIdAvailability/nickNameCheck', nickName); 
    console.log('응답 값:', response.data);
    setIsIdAvailable(response.data);

      console.log('응답 값:', response.data);
      setIsIdAvailable(response.data);
  
      // 중복 확인 결과에 따라 메시지를 표시합니다.
      if (response.data === 0) {
        alert("사용 가능한 닉네임입니다.");
      } else if (response.data >= 1)  {
        alert("이미 사용 중인 닉네임입니다.");
      }
    } catch (error) {
      console.error('Error occurred while checking ID availability:', error);
    }
  };
// phoneNum 유효성 검사

  const handleCheckPhoneNumAvailability = async () => {
    try {
      const response = await axios.post('http://localhost:80/checkIdAvailability/phoneNumCheck', [phoneNum1, phoneNum2, phoneNum3]
      
      );
    console.log('응답 값:', response.data);
    setIsIdAvailable(response.data);

      console.log('응답 값:', response.data);
      setIsIdAvailable(response.data);
  
      // 중복 확인 결과에 따라 메시지를 표시합니다.
      if (response.data === 0) {
        alert("사용 가능한 번호입니다.");
      } else if (response.data >= 1)  {
        alert("이미 사용 중인 번호입니다.");
      }
    } catch (error) {
      console.error('Error occurred while checking ID availability:', error);
    }
  };

  const handleSubmit = async () => {
    const userInfo = {
      userId,
      nickName,
      userName: username,
      passWd: password,
      profileImagePath: profileImage ? profileImage.name : '',
      phoneNum1,
      phoneNum2,
      phoneNum3,
      emailNum1,
      emailNum2: emailDomain,
      birth,
      gender: gender === "남성" ? "F" : "M",
    };

    try {
      const response1 = await axios.post('http://localhost:80/addmember', userInfo, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // 이미지가 있는 경우에만 이미지를 업로드하는 axios 요청을 보냅니다.
      if (profileImage) {
        const formData = new FormData();
        formData.append('profileImage', profileImage);
        const response2 = await axios.post('http://localhost:80/addmember/image', formData);
        
        if (response1.status === 200 && response2.status === 200) {
          const data1 = response1.data;
          const data2 = response2.data;
          console.log(data1, data2);
        } else {
          console.error('회원가입(중복검사 해주세요) 또는 이미지 업로드에 실패했습니다.');
          alert('회원가입(중복검사 해주세요) 또는 이미지 업로드에 실패했습니다.');
        }
      } else {
        if (response1.status === 200) {
          const data1 = response1.data;
          console.log(data1);
          navigate('/');
        } else {
          console.error('회원가입(중복검사 해주세요)에 실패했습니다.');
          alert('회원가입(중복검사 해주세요)에 실패했습니다.');
        }
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
    }
  };


  return (
    <>
      <h2 class="signup-title">회원가입</h2>

      <div className='totalcontainer'>
        <p>아이디:</p>
        <p>
          <input className="login" type="text" placeholder="아이디" value={userId} onChange={handleIdChange} />
        </p>
          <button onClick={handleCheckIdAvailability}>중복 확인</button>
          {isIdAvailable === true ? <span style={{ color: 'green' }}>사용 가능한 아이디입니다.</span> : isIdAvailable === false ? <span style={{ color: 'red' }}>이미 사용 중인 아이디입니다.</span> : null}
        <p>사용자 이름:</p>
        <p>   
          <input className="login" type="text" placeholder="사용자 이름" value={username} onChange={event => setUsername(event.target.value)} />
        </p>
        <p>닉네임:</p>
        <p>
          <input className="login" type="text" placeholder="닉네임" value={nickName} onChange={event => setNickName(event.target.value)}  />
        </p>
          <button onClick={handleCheckNickNameAvailability}>중복 확인</button>
          {isNickNameAvailable === true ? <span style={{ color: 'green' }}>사용 가능한 닉네임입니다.</span> : isNickNameAvailable === false ? <span style={{ color: 'red' }}>이미 사용 중인 닉네임입니다.</span> : null}
        <p>비밀번호:</p>
        <p>
          <input className="login" type="password" placeholder="비밀번호" onChange={event => setPassword(event.target.value)} />
        </p>
        <p>프로필 이미지:</p>
        <p>
          <input className="login4" type="file" accept="image/*" onChange={handleProfileImageChange} />
        </p>
        <p>핸드폰 번호:</p>
        <p className='phone-group'>
          <input className="login1" type="text" maxLength="3" value={phoneNum1} onChange={event => handlePhoneNumberChange(event, setPhoneNumber1)} /> -
          <input className="login2" type="text" maxLength="4" value={phoneNum2} onChange={event => handlePhoneNumberChange2(event, setPhoneNumber2)} /> -
          <input className="login3" type="text" maxLength="4" value={phoneNum3} onChange={event => handlePhoneNumberChange3(event, setPhoneNumber3)} />
        </p>
          <button onClick={handleCheckPhoneNumAvailability}>중복 확인</button>
          {isPhoneNumAvailable === true ? <span style={{ color: 'green' }}>사용 가능한 핸드폰 번호입니다.</span> : isPhoneNumAvailable === false ? <span style={{ color: 'red' }}>이미 사용 중인 핸드폰 번호입니다.</span> : null}
        <p>이메일:</p>
        <p className='email-group'>
          <input className="login5" type="text" placeholder="아이디" onChange={event => setEmailNum1(event.target.value)} />
          @
          <select value={emailDomain} onChange={handleEmailDomainChange}>
            {emailDomains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
          {emailDomainInput &&
            <input className="login6" type="text" placeholder="도메인을 직접 입력하세요" onChange={event => setEmailDomain(event.target.value)} />
          }
        </p>
          <button onClick={handleCheckEmailAvailability}>중복 확인</button>
          {isEmailAvailable === true ? <span style={{ color: 'green' }}>사용 가능한 이메일입니다.</span> : isEmailAvailable === false ? <span style={{ color: 'red' }}>이미 사용 중인 이메일입니다.</span> : null}
        <p>생년월일:</p>
        <p>
          <input className="login" type="text" placeholder="YYYY-MM-DD" value={birth} onChange={event => setBirth(event.target.value)} />
        </p>
        <p>성별:</p>
        <p>
          <select class="gender-select" onChange={event => setGender(event.target.value)}>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </p>
        <p><input className="btn" type="submit" value="회원가입" onClick={handleSubmit} /></p>
      </div>

      <p className="login-return">로그인화면으로 돌아가기  <button onClick={() => {
        props.setMode("LOGIN");
      }}>로그인</button></p>
    </>
  );
}

function App() {
  const [mode, setMode] = useState("SIGNIN");

  return (
    <>
      <div className="background">
        <Signin setMode={setMode}></Signin>
      </div>
    </>
  );
}



export default MemberJoin;


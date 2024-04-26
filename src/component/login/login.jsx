import { useState } from "react";



const LoginPage = () => {

        const [userid , setUserid] = useState('');
        const [password, setPassword] = useState('');

    
        
            
           
            return (
                <div style={{ 
                    display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    width: '100%', height: '100vh'
                    }}>

            <form style = {{display: 'flex', flexDirection: 'column'}}
            
            >

                <label>I D</label>
                <input type='text' placeholder = "아이디" value={userid} onChange={(e) => setUserid(e.target.value)} />
                <label>Password</label>
                <input type='password' placeholder = "비밀번호" value={password}  onChange={(e) => setPassword(e.target.value)}
      />
                <br />
                <button type='submit'>
                    로그인
                </button>
            </form>
        </div>
    );
};

export default LoginPage;


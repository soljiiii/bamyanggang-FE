import { useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";


function LoginCheck() {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('access');

        // AccessToken이 있는지 확인
        if (accessToken !== null) {
            // AccessToken의 만료 여부 확인
            const decodedToken = jwtDecode(accessToken);
            const expTime = decodedToken.exp;
            const curTime = Math.floor(Date.now() / 1000);

            if (expTime > curTime) {
                // 만료되지 않은 경우, 마이페이지로 이동

                // navigate('/');


            } else {
                // AccessToken이 만료된 경우, 재발급 요청 보내기
                const refreshToken = localStorage.getItem('refresh');

            //     if (refreshToken) {
            //         axios.post('/reissue', { refreshToken }, { withCredentials: true })
            //             .then(response => {
            //                 const newAccessToken = response.headers['access'];
            //                 const newRefreshToken = response.headers['refresh'];

            //                 // 새로운 accessToken과 refreshToken을 localStorage에 저장
            //                 localStorage.setItem('access', newAccessToken);
            //                 localStorage.setItem('refresh', newRefreshToken);

            //                 // 새로고침하여 현재 페이지를 다시 로드
            //                 window.location.reload();
            //             })
            //             .catch(error => {
            //                 console.error('토큰 재발급 요청 실패:', error);
            //                 // 재발급 요청 실패 시 로그인 페이지로 이동
            //                 navigate('/login');
            //             });
            //     } else {
            //         // refreshToken이 없으면 로그아웃 처리
            //         console.log('RefreshToken이 없습니다.');
            //         navigate('/login');
            //     }
             }
        } else {
            // AccessToken이 없으면 로그인 페이지로 이동
            console.log('AccessToken이 없습니다.');
            navigate('/login');
        }
    }, [navigate]);

    return null;
}


export default LoginCheck;
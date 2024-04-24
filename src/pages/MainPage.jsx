import {Link} from 'react-router-dom';

import GameSearch from './game/GameSearch';
import Notice from './boards/Notice';
import Board from './boards/Board';
import Guide from './boards/Guide';
import MyPage from './mypage/MyPage';
import Login from './mypage/Login';
import MemberJoin from './mypage/MemberJoin';
import Input from '../component/common/Input';
import Header from '../layouts/Header';

function MainPage(){
    return (
        <div>
            <div>
                <Header/>

                {/* <Link to="/gameSearch">게임 목록 가기</Link><br/>
                <Link to="/notice">공지사항 가기</Link><br/>
                <Link to="/board">커뮤니티 가기</Link><br/>
                <Link to="/guide">게임가이드 가기</Link><br/>
                <Link to="/myPage">마이페이지 가기</Link><br/>
                <Link to="/login">로그인</Link><br/>
                <Link to="/memberJoin">회원가입</Link><br/> */}
            </div>

            <div>
                <img src="/images-jsx/메인베너.svg" style= {{width: '100%'}}/>
            </div>
        </div>

        
    );
}
export default MainPage;
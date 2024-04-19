import {Link} from 'react-router-dom';

import GameSearch from './game/GameSearch';
import Notice from './boards/Notice';
import Board from './boards/Board';
import Guide from './boards/Guide';
import MyPage from './mypage/MyPage';
import Login from './mypage/Login';
import MemberJoin from './mypage/MemberJoin';
import Input from '../component/common/Input';

function MainPage(){
    return (
        <div>
            <div>
                <Link to="/gameSearch">게임 목록 가기</Link><br/>
                <Link to="/notice">공지사항 가기</Link><br/>
                <Link to="/board">커뮤니티 가기</Link><br/>
                <Link to="/guide">게임가이드 가기</Link><br/>
                <Link to="/myPage">마이페이지 가기</Link><br/>
                <Link to="/login">로그인</Link><br/>
                <Link to="/memberJoin">회원가입</Link><br/>
            </div>
        <div>
            <Input
            />
        </div>
        </div>
    );
}
export default MainPage;
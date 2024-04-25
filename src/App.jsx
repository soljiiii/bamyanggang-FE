import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GameSearch from './pages/game/GameSearch';
import GameReady from './pages/game/GameReady';
import OnGame from './pages/game/OnGame';
import Notice from './pages/boards/Notice';
import Board from './pages/boards/Board';
import Guide from './pages/boards/Guide';
import MyPage from './pages/mypage/MyPage';
import Login from './pages/mypage/Login';
import MemberModify from './pages/mypage/MemberModify';
import MemberJoin from './pages/mypage/MemberJoin';
import MemberDelete from './pages/mypage/MemberDelete';
import NoticeView from './pages/boards/NoticeView';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/gameSearch" element={<GameSearch />} />
          <Route path="/gameReady/:roomNo" element={<GameReady />} />
          <Route path="/onGame/:no" element={<OnGame />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice:postNo" element={<NoticeView />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/:no" element={<Board />} />
          <Route path="/guide" element={<Guide/>}/>
          <Route path="/myPage" element={<MyPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/memberModify" element={<MemberModify/>}/>
          <Route path="/memberDelete" element={<MemberDelete/>}/>
          <Route path="/memberJoin" element={<MemberJoin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


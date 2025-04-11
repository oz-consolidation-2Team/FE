import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UserMyPage from './pages/UserMyPage';
import CompanyInfoPage from './pages/CompanyInfoPage';
import RecruitmentInfo from './pages/RecruitmentInfo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/user_mypage" element={<UserMyPage />} />
      <Route path="/company_info_page" element={<CompanyInfoPage />} />
      <Route path="/recruitment_info" element={<RecruitmentInfo />} />
    </Routes>
  );
}

export default App;

import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import UserMyPage from './pages/UserMyPage';
import CompanyInfoPage from './pages/CompanyInfoPage';
import RecruitmentInfo from './pages/RecruitmentInfo';
import AnnouncementAdd from './pages/AnnouncementAdd';
import SearchResults from './pages/RecruitmentInfo/SearchResults';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/recruitment_info" element={<RecruitmentInfo />} />
        <Route path="/mypage/user" element={<UserMyPage />} />
      </Route>
      <Route path="/signup" element={<SignUpPage />} />

      <Route path="/company_info_page" element={<CompanyInfoPage />} />
      <Route path="/company_announcement_add_page" element={<AnnouncementAdd />} />

      <Route path="/search-results" element={<SearchResults />} />
    </Routes>
  );
}

export default App;

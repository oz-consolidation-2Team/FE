import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import UserInfoPage from './pages/UserInfoPage';
import CompanyInfoPage from './pages/CompanyInfoPage';
import RecruitmentInfo from './pages/RecruitmentInfo';
import AnnouncementAdd from './pages/AnnouncementAdd';
import SearchResults from './pages/RecruitmentInfo/SearchResults';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path="/user_info_page" element={<UserInfoPage />} />

      <Route path="/company_info_page" element={<CompanyInfoPage />} />
        <Route path="/company_announcement_add_page" element={<AnnouncementAdd />} />

      <Route path="/recruitment_info" element={<RecruitmentInfo />} />
      <Route path="/search-results" element={<SearchResults />} />
    </Routes>
  );
}

export default App;

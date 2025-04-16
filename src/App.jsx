import './App.scss';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
import CompanyMyPage from './pages/CompanyMyPage';
import RecruitmentInfo from './pages/RecruitmentInfo';
import AnnouncementAdd from './pages/AnnouncementAdd';
import SearchResults from './pages/RecruitmentInfo/SearchResults';
import AnnouncementEdit from './pages/AnnouncementEdit';
import CompanyInfo from './pages/CompanyInfo';
import CompanyResumes from './pages/CompanyResumes';
import CompanyInfoEdit from './pages/CompanyInfoEdit';
import UserMyPage from './pages/UserMyPage';
import Layout from './components/Layout';
import JobDetail from './pages/RecruitmentInfo/JobDetail';
import LoginPage from './pages/LoginPage';
import AboutCompany from './pages/AboutCompany/About';
import FindEmailPage from './pages/FindEmailPage';
import FindPasswordPage from './pages/FindPasswordPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find-email" element={<FindEmailPage />} />
        <Route path='forgot-password' element={<FindPasswordPage />} />
        <Route path="/about" element={<AboutCompany />} />
        <Route path="/recruitment_info" element={<RecruitmentInfo />} />
        <Route path="/mypage/user" element={<UserMyPage />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/job-detail/:id" element={<JobDetail />} />
        <Route path="/company_my_page" element={<CompanyMyPage />} />
        <Route path="/company_info_page/:id" element={<CompanyInfo />} />
        <Route path="/company_info_edit_page" element={<CompanyInfoEdit />} />
        <Route path="/company_announcement_add_page" element={<AnnouncementAdd />} />
        <Route path="/company_announcement_edit_page/:id" element={<AnnouncementEdit />} />
        <Route path="/company_resumes_page/:id" element={<CompanyResumes />} />
      </Route>

      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;

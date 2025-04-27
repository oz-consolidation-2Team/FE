import './App.scss';
import { Route, Routes } from 'react-router-dom';
import MainPage from '@/pages/MainPage';
import SignUpPage from '@/pages/SignUpPage';
import CompanyMyPage from './pages/CompanyMyPage';
import RecruitmentInfo from './pages/RecruitmentInfo';
import SearchResults from './pages/RecruitmentInfo/SearchResults';
import CompanyInfo from './pages/CompanyInfo';
import CompanyResumes from './pages/CompanyResumes';
import CompanyInfoEdit from './pages/CompanyInfoEdit';
import UserMyPage from './pages/UserMyPage';
import Layout from './components/Layout';
import JobDetail from './pages/RecruitmentInfo/JobDetail';
import LoginPage from './pages/LoginPage';
import AboutCompany from './pages/AboutCompany/About';
import TrainingSearch from './pages/JobTraining/TrainingSearch';
import MyResumes from './pages/MyResumes';
import FindEmailPage from './pages/FindEmailPage';
import Announcement from './pages/Announcement';
import FindPasswordPage from './pages/FindPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/find-email" element={<FindEmailPage />} />
        <Route path="/forgot-password" element={<FindPasswordPage />} />
        <Route path="/reset-password/:type" element={<ResetPasswordPage />} />
        <Route path="/about" element={<AboutCompany />} />
        <Route path="/recruitment_info" element={<RecruitmentInfo />} />
        <Route path="/mypage/user" element={<UserMyPage />} />
        <Route path="/mypage/user/resumes" element={<MyResumes />} />
        <Route path="/mypage/user/resumes/:id" element={<MyResumes />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/job-detail/:postingId" element={<JobDetail />} />
        <Route path="/mypage/company" element={<CompanyMyPage />} />
        <Route path="/company-info/:id" element={<CompanyInfo />} />
        <Route path="/mypage/company/info-edit" element={<CompanyInfoEdit />} />
        <Route path="/mypage/company/announcement/add" element={<Announcement type="add" />} />
        <Route path="/mypage/company/announcement/edit/:id" element={<Announcement type="edit" />} />
        <Route path="/mypage/company/announcement/resumes/:id" element={<CompanyResumes />} />
        <Route path="/trainingSearch" element={<TrainingSearch />} />
      </Route>

      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;

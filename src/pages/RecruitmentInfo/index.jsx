import './RecruitmentInfo.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicJobList from './PublicJobList';
import JobList from './JobList';
import SearchFilters from './SearchFilters';


function RecruitmentInfo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedJobCategory, setSelectedJobCategory] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(''); // 1. selectedDistrict 상태 추가
  const navigate = useNavigate();




  const handleSearch = () => {
    const fullLocation = selectedCity && selectedDistrict
      ? `${selectedCity} ${selectedDistrict}`
      : selectedCity || '';

    // TODO: 실제 API 연동 시 이 부분을 대체할 예정
    const filteredResults = []; 

    navigate('/search-results', { state: { results: filteredResults } });
  };

  return (
    <div className='recruitment_container'>
      <h1 className='title'>채용 정보</h1>

      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        selectedJobCategory={selectedJobCategory} 
        setSelectedJobCategory={setSelectedJobCategory} 
        onSearch={handleSearch}
      />

      {/* 공공일자리 정보 컴포넌트 */}
      <PublicJobList />
      {/* 일반 채용 정보 컴포넌트 */}
      <JobList searchQuery={searchQuery} />
    </div>
  );
}

export default RecruitmentInfo;
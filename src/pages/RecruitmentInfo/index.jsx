import './RecruitmentInfo.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicJobList from './PublicJobList';
import JobList from './JobList';
import { dummyData } from './JobList'; // 더미 데이터 import
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

    const filteredResults = dummyData.filter(job => {
      return (
        (fullLocation ? job.work_address.includes(fullLocation) : true) &&
        (selectedJobCategory ? job.job_category === selectedJobCategory : true) && 
        (searchQuery
          ? job.title.includes(searchQuery) ||             // 제목으로 검색
            job.description.includes(searchQuery) ||       // 상세 내용 으로 검색
            job.other_conditions.includes(searchQuery) ||  // 기타 조건으로 검색
            job.work_place_name.includes(searchQuery)      // 회사명으로 검색
          : true)
      );
    });

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
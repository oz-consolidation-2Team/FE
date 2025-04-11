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
  const [selectedJobCategory, setSelectedJobCategory] = useState(''); // Changed selectedCategory to selectedJobCategory
  const [selectedDistrict, setSelectedDistrict] = useState(''); // 1. selectedDistrict 상태 추가
  const navigate = useNavigate();




  const handleSearch = () => {
    const fullLocation = selectedCity && selectedDistrict
      ? `${selectedCity} ${selectedDistrict}`
      : selectedCity || '';

    const filteredResults = dummyData.filter(job => {
      return (
        (fullLocation ? job.work_address.includes(fullLocation) : true) &&
        (selectedJobCategory ? job.job_category === selectedJobCategory : true) && // Updated filter condition
        (searchQuery ? job.title.includes(searchQuery) : true)
      );
    });

    navigate('/search-results', { state: { results: filteredResults } });
  };

  return (
    <div className='recruitment-container'>
      <h1 className='recruitment-title'>채용 정보</h1>

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
      <div className='recruitment-title'>일반 채용</div>
      {/* 일반 채용 정보 컴포넌트 */}
      <JobList searchQuery={searchQuery} />
    </div>
  );
}

export default RecruitmentInfo;
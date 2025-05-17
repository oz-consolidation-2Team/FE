import './RecruitmentInfo.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicJobList from './PublicJobList';
import JobList from './JobList';
import SearchFilters from './SearchFilters';




function RecruitmentInfo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [districtInput, setDistrictInput] = useState('');
  const [jobCategoryInput, setJobCategoryInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const location1 = cityInput;
    const location2 = districtInput;

    const rawParams = {
      keyword: searchQuery,
      location1,
      location2,
      job_category: jobCategoryInput,
      page: 1,
    };

    const params = new URLSearchParams(
      Object.entries(rawParams).filter(([_, v]) => !!v || v === 0)
    );

    navigate(`/search-results?${params.toString()}`);
  };

  return (
    <div className='recruitment_container'>
      <h1 className='title'>채용 정보</h1>

      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cityInput={cityInput}
        setCityInput={setCityInput}
        districtInput={districtInput}
        setDistrictInput={setDistrictInput}
        jobCategoryInput={jobCategoryInput}
        setJobCategoryInput={setJobCategoryInput}
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
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchFilters from './SearchFilters';
import { dummyData } from '../RecruitmentInfo/JobList';
import JobCard from './JobCard';
import './RecruitmentInfo.scss';
const SearchResults = () => {
  const navigate = useNavigate();
  const { state } = useLocation();  // navigate로 전달된 state를 받음
  const results = state?.results || [];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isBookmarked, setIsBookmarked] = useState({});

  const toggleBookmark = (id) => {
    setIsBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSearch = () => {
    const fullLocation = selectedCity && selectedDistrict
      ? `${selectedCity} ${selectedDistrict}`
      : selectedCity;

    const filteredResults = dummyData.filter((job) => {
      return (
        (!fullLocation || job.work_address.includes(fullLocation)) &&
        (!selectedCategory || job.category === selectedCategory) &&
        (!searchQuery || job.title.includes(searchQuery))
      );
    });

    navigate('/search-results', { state: { results: filteredResults } });
  };

  return (
    <div className="recruitment-container">
      <SearchFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSearch={handleSearch}
      />
      <div className="search-results">
        <h2>검색 결과</h2>
        {results.length > 0 ? (
          results.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isBookmarked={isBookmarked[job.id]}
              toggleBookmark={() => toggleBookmark(job.id)}
            />
          ))
        ) : (
          <p>검색된 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
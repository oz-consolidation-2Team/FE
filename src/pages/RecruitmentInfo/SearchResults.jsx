import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchFilters from './SearchFilters';
import JobCard from './JobCard';
import './SearchResults.scss';
import { searchJobPostings } from '@/apis/RecruitmentApi';
import Pagination from 'react-js-pagination';

/**
 * 채용공고 검색 결과 페이지
 * - 쿼리스트링으로 전달받은 검색 조건을 바탕으로 공고 리스트를 불러온다.
 * - 필터 입력, 검색 버튼, 페이지네이션 기능을 제공한다.
 */
const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const locationParam = searchParams.get('location') || '';
  const jobCategory = searchParams.get('job_category') || '';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setSearchQueryState(keyword);
    setCommittedKeyword(keyword);
    setCityInput(locationParam.split(' ')[0] || '');
    setDistrictInput(locationParam.split(' ')[1] || '');
    setJobCategoryInput(jobCategory);
  }, [keyword, locationParam, jobCategory]);

  /**
   * 검색 결과 상태 및 입력값 상태를 관리하는 훅
   * results: 검색된 채용공고 목록
   * totalCount: 검색된 전체 공고 수
   * currentPage: 현재 페이지 번호
   * searchQueryState: 입력창에 입력 중인 검색어
   * committedKeyword: 검색이 실제 실행된 키워드
   * cityInput, districtInput, jobCategoryInput: 사용자가 입력한 필터 값
   * selectedCity, selectedDistrict, selectedJobCategory: 실제 적용되어 검색된 필터 값
   */
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const itemsPerPage = 10;

  const [searchQueryState, setSearchQueryState] = useState(keyword);
  const [committedKeyword, setCommittedKeyword] = useState(keyword);
  const [cityInput, setCityInput] = useState(locationParam.split(' ')[0] || '');
  const [districtInput, setDistrictInput] = useState(locationParam.split(' ')[1] || '');
  const [jobCategoryInput, setJobCategoryInput] = useState(jobCategory);

  const [selectedCity, setSelectedCity] = useState(cityInput);
  const [selectedDistrict, setSelectedDistrict] = useState(districtInput);
  const [selectedJobCategory, setSelectedJobCategory] = useState(jobCategoryInput);

  /**
   * 검색 버튼 또는 페이지네이션 클릭 시 호출되는 검색 실행 함수
   * 검색 조건을 URL로 반영하여 쿼리스트링으로 전달한다.
   * @param {number} page - 검색할 페이지 번호
   */
  const handleSearch = (page = 1) => {
    setSelectedCity(cityInput);
    setSelectedDistrict(districtInput);
    setSelectedJobCategory(jobCategoryInput);
    setCommittedKeyword(searchQueryState);

    const location = `${cityInput}${districtInput ? ` ${districtInput}` : ''}`;
    const params = new URLSearchParams({
      keyword: searchQueryState,
      location,
      job_category: jobCategoryInput,
      page,
    });
    navigate(`/search-results?${params.toString()}`);
  };

  /**
   * 선택된 검색 조건(selectedCity, selectedDistrict, selectedJobCategory, committedKeyword, page)이 변경될 때마다
   * 백엔드에서 채용공고 리스트를 가져오는 비동기 요청을 수행한다.
   */
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const location = `${selectedCity}${selectedDistrict ? ` ${selectedDistrict}` : ''}`;
        const rawParams = {
          keyword: committedKeyword,
          location,
          job_category: selectedJobCategory,
          page,
          limit: 10,
        };

        const params = Object.fromEntries(
          Object.entries(rawParams).filter(([_, v]) => !!v || v === 0)
        );

        const data = await searchJobPostings(params);
        setResults(data.items);
        setTotalCount(data.total);
        setCurrentPage(page);
      } catch (error) {
        console.error('검색 중 오류 발생:', error);
      }
    };

    fetchResults();
  }, [selectedCity, selectedDistrict, selectedJobCategory, page, committedKeyword]);

  const [isBookmarked, setIsBookmarked] = useState({});

  /**
   * 즐겨찾기 버튼 클릭 시 해당 공고의 북마크 상태를 토글한다.
   * @param {number} id - 채용공고의 고유 ID
   */
  const toggleBookmark = (id) => {
    setIsBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="searchresults_container">
      <SearchFilters
        searchQuery={searchQueryState}
        setSearchQuery={setSearchQueryState}
        cityInput={cityInput}
        setCityInput={setCityInput}
        districtInput={districtInput}
        setDistrictInput={setDistrictInput}
        jobCategoryInput={jobCategoryInput}
        setJobCategoryInput={setJobCategoryInput}
        onSearch={handleSearch}
      />
      <div className="results">
        <h2>검색 결과</h2>
        {results.length > 0 ? (
          results.map((job) => (
            <div key={job.id} className="result-card">
              <JobCard
                job={job}
                isBookmarked={isBookmarked[job.id]}
                toggleBookmark={() => toggleBookmark(job.id)}
              />
            </div>
          ))
        ) : (
          <p>검색된 결과가 없습니다.</p>
        )}
      </div>
      <Pagination
        activePage={currentPage}
        totalItemsCount={totalCount}
        itemsCountPerPage={itemsPerPage}
        pageRangeDisplayed={5}
        onChange={(newPage) => {
          handleSearch(newPage);
          window.scrollTo({ top: 0 });
        }}
        innerClass="pagination"
        activeClass="active"
        disabledClass="disabled"
      />
    </div>
  );
};

export default SearchResults;
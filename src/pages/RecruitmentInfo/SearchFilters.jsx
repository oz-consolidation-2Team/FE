import React from 'react';
import './SearchFilters.scss'; 
import { KoreaRegions } from '../../utils/KoreaRegions';
import { INTEREST_OPTIONS } from '@/utils/signUpInfoOptions';


const districtsByCity = Object.entries(KoreaRegions).reduce((acc, [city, value]) => {
  acc[city] = value.filter((gu) => !gu.includes('전체'));
  return acc;
}, {});

/**
 * 채용공고 검색 필터 
 * 검색어 엔터 또는 검색 버튼 클릭 시 검색 실행
 * @param {string} searchQuery - 검색어 문자열
 * @param {function} setSearchQuery - 검색어 상태 업데이트 함수
 * @param {string} cityInput - 선택된 시/도
 * @param {function} setCityInput - 시/도 상태 업데이트 함수
 * @param {string} districtInput - 선택된 구/군
 * @param {function} setDistrictInput - 구/군 상태 업데이트 함수
 * @param {string} jobCategoryInput - 선택된 직종
 * @param {function} setJobCategoryInput - 직종 상태 업데이트 함수
 * @param {function} onSearch - 검색 실행 함수
 */
function SearchFilters({
  searchQuery,
  setSearchQuery,
  cityInput,
  setCityInput,
  districtInput,
  setDistrictInput,
  jobCategoryInput,
  setJobCategoryInput,
  onSearch
}) {

  return (
    <div className="Search_container">
      <div className="search_filters">
      <select
        value={cityInput}
        onChange={(e) => {
          setCityInput(e.target.value);
          setDistrictInput(''); 
        }}
      >
        <option value="">지역 선택</option>
        {Object.keys(KoreaRegions).map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      {cityInput && (
        <select value={districtInput} onChange={(e) => setDistrictInput(e.target.value)}>
          <option value="">상세 지역 선택</option>
          {(districtsByCity[cityInput] || []).map((gu) => (
            <option key={gu} value={gu}>{gu}</option>
          ))}
        </select>
      )}

      <select value={jobCategoryInput} onChange={(e) => setJobCategoryInput(e.target.value)}>
        <option value="">직종 선택</option>
        {INTEREST_OPTIONS.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch();
          }
        }}
      />

      <button onClick={onSearch}>검색</button>
      </div>
    </div>
  );
}

export default SearchFilters;

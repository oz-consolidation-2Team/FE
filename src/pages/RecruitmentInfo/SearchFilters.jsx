import React from 'react';
import './SearchFilters.scss'; 
import { KoreaRegions } from '../../utils/KoreaRegions';

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
        {Object.keys(districtsByCity).map((city) => (
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
        <option value="외식·음료">외식·음료</option>
        <option value="유통·판매">유통·판매</option>
        <option value="문화·여가·생활">문화·여가·생활</option>
        <option value="서비스">서비스</option>
        <option value="사무·회계">사무·회계</option>
        <option value="고객상담·영업·리서치">고객상담·영업·리서치</option>
        <option value="생산·건설·노무">생산·건설·노무</option>
        <option value="IT·인터넷">IT·인터넷</option>
        <option value="교육·강사">교육·강사</option>
        <option value="디자인">디자인</option>
        <option value="미디어">미디어</option>
        <option value="운전·배달">운전·배달</option>
        <option value="병원·간호·연구">병원·간호·연구</option>
        <option value="전문-상담직">전문-상담직</option>
        <option value="전문-사무직">전문-사무직</option>
        <option value="전문-BAR">전문-BAR</option>
        <option value="전문-생산직">전문-생산직</option>
        <option value="전문-외식업">전문-외식업</option>
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

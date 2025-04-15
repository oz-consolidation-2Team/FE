import React from 'react';
import './SearchFilters.scss'; 
const districtsByCity = {
  서울특별시: ['강남구', '강동구', '강북구', '중구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중랑구'],
  부산광역시: ['부산진구', '해운대구', '동래구', '남구', '북구', '사하구', '금정구', '연제구', '수영구', '강서구'],
  인천광역시: ['남동구', '부평구', '계양구', '서구', '연수구', '중구', '미추홀구', '강화군'],
  대구광역시: ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구'],
  대전광역시: ['서구', '유성구', '동구', '중구', '대덕구'],
  울산광역시: ['남구', '동구', '북구', '중구', '울주군'],
  광주광역시: ['동구', '서구', '남구', '북구', '광산구'],
  제주특별자치도: ['제주시', '서귀포시'],
};

function SearchFilters({
  searchQuery,          //검색창에 입력된 텍스트
  setSearchQuery,       //검색어 상태를 업데이트
  selectedCity,         //선택된 지역
  setSelectedCity,      //지역 상태를 설정하는 함수
  selectedDistrict,     //선택된 상세 지역
  setSelectedDistrict,  //상세 지역 상태를 설정하느 함수
  selectedJobCategory,     //선택된 직종
  setSelectedJobCategory,  //직종 상태를 설정하는 함수
  onSearch,             //검색 버튼 클릭시 호출되는 함수
}) {
  return (
    <div className="search-filters">
      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="">지역 선택</option>
        {Object.keys(districtsByCity).map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      {selectedCity && (
        <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
          <option value="">상세 지역 선택</option>
          {districtsByCity[selectedCity].map((gu) => (
            <option key={gu} value={gu}>{gu}</option>
          ))}
        </select>
      )}

      <select value={selectedJobCategory} onChange={(e) => setSelectedJobCategory(e.target.value)}>
        <option value="">직종 선택</option>
        <option value="IT">IT</option>
        <option value="교육">교육</option>
        <option value="서비스">서비스</option>
        <option value="생산">생산</option>
        <option value="기타">기타</option>
        <option value="디자인">디자인</option>
        <option value="제조">제조</option>
        <option value="의료">의료</option>
        <option value="기획">기획</option>
        <option value="물류">물류</option>
        <option value="운송">운송</option>
        <option value="농업">농업</option>
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
  );
}

export default SearchFilters;

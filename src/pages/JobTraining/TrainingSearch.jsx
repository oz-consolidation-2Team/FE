import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import "./TrainingSearch.scss";

const WORK24_URL = import.meta.env.VITE_WORK24_URL;

const jobCategories = [
  { code: "01", name: "사업관리" },
  { code: "02", name: "경영/회계/사무" },
  { code: "03", name: "금융/보험" },
  { code: "04", name: "교육/자연/사회과학" },
  { code: "05", name: "법률/경찰/소방/교도/국방" },
  { code: "06", name: "보건/의료" },
  { code: "07", name: "사회복지/종교" },
  { code: "08", name: "문화/예술/디자인/방송" },
  { code: "09", name: "운전/운송" },
  { code: "10", name: "영업판매" },
  { code: "11", name: "경비/청소" },
  { code: "12", name: "이용/숙박/여행/오락/스포츠" },
  { code: "13", name: "음식서비스" },
  { code: "14", name: "건설" },
  { code: "15", name: "기계" },
  { code: "16", name: "재료" },
  { code: "17", name: "화학" },
  { code: "18", name: "섬유/의복" },
  { code: "19", name: "전기/전자" },
  { code: "20", name: "정보통신" },
  { code: "21", name: "식품가공" },
  { code: "22", name: "인쇄/목재/가구/공예" },
  { code: "23", name: "환경/에너지/안전" },
  { code: "24", name: "농림어업" },
];

const areaOptions = [
  { code: "11", name: "서울특별시" },
  { code: "26", name: "부산광역시" },
  { code: "27", name: "대구광역시" },
  { code: "28", name: "인천광역시" },
  { code: "29", name: "광주광역시" },
  { code: "30", name: "대전광역시" },
  { code: "31", name: "울산광역시" },
  { code: "36", name: "세종특별자치시" },
  { code: "41", name: "경기도" },
  { code: "43", name: "충청북도" },
  { code: "44", name: "충청남도" },
  { code: "45", name: "전라북도" },
  { code: "46", name: "전라남도" },
  { code: "47", name: "경상북도" },
  { code: "48", name: "경상남도" },
  { code: "50", name: "제주특별자치도" },
  { code: "51", name: "강원특별자치도" },
];

const TrainingSearch = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchTrainings = async (pageNum = 1) => {
    setLoading(true);
    try {
      /**
       * @typedef {Object} Params
       * @property {string} authKey - 인증 키 (환경변수에서 가져옴)
       * @property {string} returnType - 응답 형식: JSON
       * @property {number} outType - 출력 형태 (1: 목록 출력)
       * @property {number} pageNum - 현재 페이지 번호
       * @property {number} pageSize - 한 페이지에 보여줄 항목 수
       * @property {string} sort - 정렬 방식 (ASC: 오름차순) ,(DESC: 내림차순)
       * @property {string} sortCol - 정렬 기준 컬럼: (TRNG_BGDE: 훈련 시작일), (TRNG_CRSN: 훈련 과정명), (TOT_FXNUM: 모집인원순)
       * @property {string} [srchNcs1] - 선택된 직종 필터 (NCS 대분류 코드)
       * @property {string} [srchTraArea1] - 선택된 지역 필터 (훈련지역 대분류 코드)
       */
      /** @type {Params} */
      const params = {
        authKey: import.meta.env.VITE_WORK24_API_KEY,
        returnType: "JSON",
        outType: 1,
        pageNum: String(pageNum),
        pageSize: 5,
        sort: "ASC",
        sortCol: "TRNG_BGDE",
        ...(selectedJob && { srchNcs1: selectedJob }),
        ...(selectedArea && { srchTraArea1: selectedArea }),
      };

      const response = await axios.get(WORK24_URL, { params });

      const items = response.data?.srchList || [];
      setResults(items);
      setTotalCount(response.data?.scn_cnt || 0);
      setCurrentPage(pageNum);
    } catch (err) {
      console.error("훈련 정보 조회 실패:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings(1);
  }, []);

  return (
    <div className="TrainingSearch_container">
      <h1 className="title">직업 훈련 검색</h1>
      <div className="filters">
        <select className="select" value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
          <option value="">전체 지역</option>
           {areaOptions.map((area) => (
          <option key={area.code} value={area.code}>{area.name}</option>
          ))}
        </select>
        <select className="select" value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}>
          <option value="">전체 직종</option>
           {jobCategories.map((job) => (
          <option key={job.code} value={job.code}>{job.name}</option>
          ))}
        </select>

        <button className="button" onClick={() => fetchTrainings(1)}>검색</button>
      </div>

      {loading ? (
        <p className="loading">로딩 중...</p>
      ) : results.length === 0 ? (
        <p className="empty">검색 결과가 없습니다.</p>
      ) : (
        <ul className="list">
          {results.map((item, idx) => (
            <li
              key={idx}
              className="card"
              onClick={() => window.open(item.titleLink, "_blank")}
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <h3 className="name">{item.title}</h3>
              <p>훈련기관: {item.subTitle}</p>
              <p>훈련장소: {item.address}</p>
              <p>훈련기간: {item.traStartDate} ~ {item.traEndDate}</p>
            </li>
          ))}
        </ul>
      )}
       
      {results.length > 0 && (
  
        <Pagination
          activePage={currentPage}
          totalItemsCount={totalCount}
          pageRangeDisplayed={10}
          onChange={(page) => fetchTrainings(page)}
          innerClass="pagination"
          itemClass=""
          linkClass=""
          activeClass="active"
          disabledClass="disabled"
        />
      )}
    </div>
  );
};

export default TrainingSearch;
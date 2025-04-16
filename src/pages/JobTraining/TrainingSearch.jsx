import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const fetchTrainings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(WORK24_URL, {
        params: {
          authKey: import.meta.env.VITE_WORK24_API_KEY, //인증키
          returnType: "JSON", //리턴타입
          outType: 1, //출력타입
          pageNum: 1, //시작페이지
          pageSize: 100, //페이지당 출력건수
          sort: "ASC",  //정렬방식(오름차순)  , "DESC"(내림차순)
          sortCol: "TOT_FXNUM", //정렬기준(모집인원) , "TRNG_BGDE"(훈련시작일) , "TRNG_CRSN"(훈련과정명)
          ...(selectedJob && { srchNcs1: selectedJob }),
          ...(selectedArea && { srchTraArea1: selectedArea }),
        },
      });
      
      console.log("응답 데이터 확인:", response.data);

      const items = response.data?.srchList || [];
      setResults(items);
    } catch (err) {
      console.error("훈련 정보 조회 실패:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  return (
    <div>
      <h2>직업 훈련 검색</h2>
      <div>
        <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}>
          <option value="">전체 직종</option>
           {jobCategories.map((job) => (
          <option key={job.code} value={job.code}>{job.name}</option>
          ))}
        </select>

        <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
          <option value="">전체 지역</option>
           {areaOptions.map((area) => (
          <option key={area.code} value={area.code}>{area.name}</option>
          ))}
        </select>
        <button onClick={fetchTrainings}>검색</button>
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : results.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((item, idx) => (
            <li key={idx}>
              <h3>{item.title}</h3>
              <p>훈련기관: {item.subTitle}</p>
              <p>훈련기간: {item.traStartDate} ~ {item.traEndDate}</p>
              {item.titleLink && (<a href={item.titleLink}target="_blank">자세히 보기</a>)}
            </li>
          ))}
        </ul>
        )}
    </div>
  );
};

export default TrainingSearch;
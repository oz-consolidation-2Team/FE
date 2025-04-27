import axios from "axios";
import axiosInstance from "./axiosInstance";

const PUBLIC_RECRUITMENT_API_URL = import.meta.env.VITE_PUBLIC_RECRUITMENT_API_URL;
const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;

/**
 * 공공채용 정보를 조회하는 API 호출 함수
 * @param {Object} params - API 요청에 전달할 파라미터 객체 (예: 지역, 직종, 페이지 정보 등)
 * @returns {Promise<Object>} - 공공채용 데이터(JSON 형식)
 * @throws {Error} - API 호출 실패 시 에러를 던짐
 */
export const fetchPublicRecruitments = async (params) => {
  try {
    const response = await axios.get(PUBLIC_RECRUITMENT_API_URL, {
      params: {
        recrutPbancTtl: "시니어",         // 공시 제목에 "" 포함된 공고
        numOfRows: 6,                   // 한 페이지에 가져올 공고 수
        pageNo: 1,                      // 현재 페이지 번호
        resultType: "json",             // 응답 결과 타입
        ...params,                      // 외부에서 전달된 추가 파라미터들
        serviceKey: SERVICE_KEY,        // 공공데이터포털 인증키
        returnType: "JSON",             // 응답 포맷(JSON)
      },
    });
    return response.data;
  } catch (error) {
    console.error("공공채용 정보 조회 실패:", error);
    throw error;
  }
};

/**
 * 인기 채용공고 목록을 조회하는 API 호출 함수
 * @param {number} limit - 가져올 채용공고 수 (기본값: 10)
 * @returns {Promise<Object>} - 인기 채용공고 목록 데이터를 포함한 응답 객체
 * @throws {Error} - API 호출 실패 시 에러를 던짐
 */
export const getPopularJobList = async (limit = 10) => {
  try {
    const response = await axiosInstance.get(`/posting/popular`, {
      params: { limit },
    });
    return response.data;
  } catch (error) {
    console.error("인기 채용공고 목록 조회 실패:", error);
    throw error;
  }
};


/**
 * 채용공고 목록을 조회하는 API 호출 함수
 * @param {Object} [options] - 페이지네이션 옵션 객체
 * @param {number} [options.skip=0] - 건너뛸 레코드 수 (기본값: 0)
 * @param {number} [options.limit=10] - 가져올 레코드 수 (기본값: 10, 최대 100)
 * @returns {Promise<Object>} - 채용공고 목록 데이터를 포함한 응답 객체
 * @throws {Error} - API 호출 실패 시 에러를 던짐
 */
export const getJobList = async ({ skip = 0, limit = 10 } = {}) => {
  try {
    const response = await axiosInstance.get(`/posting/`, {
      params: {
        skip,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("채용공고 목록 조회 실패:", error);
    throw error;
  }
};

/**
 * 채용공고 상세 정보를 조회하는 API 호출 함수
 * @param {string} postingId - 상세 정보를 조회할 채용공고의 ID
 * @returns {Promise<Object>} - 채용공고 상세 데이터를 포함한 응답 객체
 * @throws {Error} - API 호출 실패 시 발생하는 에러
 */
export const getJobDetail = async (postingId) => {
  try {
    const response = await axiosInstance.get(`/posting/${postingId}`);
    return response.data;
  } catch (error) {
    console.error("채용공고 상세 조회 실패:", error);
    throw error;
  }
};

/**
 * 채용공고 검색 API 호출 함수
 * @param {Object} params - 검색 조건 (keyword, location, job_category, etc.)
 * @returns {Promise<Object>} - 검색 결과 응답 객체
 * @throws {Error} - API 호출 실패 시 발생하는 에러
 */
export const searchJobPostings = async (params = {}) => {
  try {
    const response = await axiosInstance.get(`/posting/search`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("채용공고 검색 실패:", error);
    throw error;
  }
};



/**
 * 채용공고에 지원하는 API 호출 함수
 * @param {number} postingId - 지원할 채용공고의 ID
 * @returns {Promise<Object>} - 지원 결과 응답 객체
 * @throws {Error} - API 호출 실패 시 에러를 던짐
 */
export const applyJobPosting = async (postingId) => {
  try {
    const response = await axiosInstance.post(
      `/applications`,
      {
        job_posting_id: postingId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("채용공고 지원 실패:", error);
    throw error;
  }
};

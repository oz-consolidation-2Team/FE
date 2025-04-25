import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
        recrutPbancTtl: "시니어",
        ...params,
        serviceKey: SERVICE_KEY,
        returnType: "JSON",
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
    const response = await axiosInstance.get(`${API_BASE_URL}/posting/popular`, {
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
    const response = await axiosInstance.get(`${API_BASE_URL}/posting/`, {
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
 * @param {string} token - 인증을 위한 JWT 토큰
 * @returns {Promise<Object>} - 채용공고 상세 데이터를 포함한 응답 객체
 * @throws {Error} - API 호출 실패 시 발생하는 에러
 */
export const getJobDetail = async (postingId, token) => {
  try {
    const response = await axiosInstance.get(
      `${API_BASE_URL}/posting/${postingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("채용공고 상세 조회 실패:", error);
    throw error;
  }
};

/**
 * 채용공고 검색 API 호출 함수
 * @param {Object} params - 검색 조건 (keyword, location, job_category, etc.)
 * @param {string} [token] - 인증이 필요한 경우 JWT 토큰
 * @returns {Promise<Object>} - 검색 결과 응답 객체
 * @throws {Error} - API 호출 실패 시 발생하는 에러
 */
export const searchJobPostings = async (params = {}, token) => {
  try {
    const response = await axiosInstance.get(`${API_BASE_URL}/posting/search`, {
      params,
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : undefined,
    });
    return response.data;
  } catch (error) {
    console.error("채용공고 검색 실패:", error);
    throw error;
  }
};


export const applyJobPosting = async (postingId, token) => {
  try {
    const response = await axiosInstance.post(
      `${API_BASE_URL}/applications`,
      {
        job_posting_id: postingId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("채용공고 지원 실패:", error);
    throw error;
  }
};

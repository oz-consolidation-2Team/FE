import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const PUBLIC_RECRUITMENT_API_URL = import.meta.env.VITE_PUBLIC_RECRUITMENT_API_URL;
const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;

/** 공공채용 정보를 조회하는 API 호출 함수 */
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
 * 채용공고 목록을 조회하는 API 호출 함수
 * 
 * @param {string} token - 인증을 위한 JWT 토큰
 * @returns {Promise<Object>} - 채용공고 목록 데이터를 포함한 응답 객체
 * @throws {Error} - API 호출 실패 시 에러를 던짐
 */
export const getJobList = async (token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/posting`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("채용공고 목록 조회 실패:", error);
    throw error;
  }
};

// 채용공고 상세 조회 API 호출 함수
export const fetchJobDetail = async (postingId, token) => {
  try {
    const response = await axios.get(
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




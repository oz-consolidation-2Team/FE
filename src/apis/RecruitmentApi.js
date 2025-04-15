import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const OPEN_API_URL = import.meta.env.VITE_OPEN_API_URL;
const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;

/** 공공채용 정보를 조회하는 API 호출 함수 */
export const fetchPublicRecruitments = async (params) => {
  try {
    const response = await axios.get(OPEN_API_URL, {
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

// 채용공고 목록 조회 API 
export const fetchJobPostings = async (token) => {
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

// 구직자 채용공고 지원 API 호출 함수 
export const sendJobApplication = async (jobPostingId, resumeId, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/applications`,
      {
        job_posting_id: jobPostingId,
        resume_id: resumeId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("지원 이력 생성 실패:", error);
    throw error;
  }
};

// 기업 회원 정보 조회 
export const fetchCompanyInfo = async (companyUserId, token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/company/${companyUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("기업 정보 조회 실패:", error);
    throw error;
  }
};
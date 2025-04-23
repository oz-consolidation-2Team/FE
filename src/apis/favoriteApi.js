import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * 즐겨찾기 추가 요청
 * @param {number} jobPostingId - 즐겨찾기로 등록할 채용공고 ID
 * @param {string} token - 사용자 인증 토큰
 * @returns {Promise<Object>} - 즐겨찾기 생성 결과 객체
 */
export const addFavorite = async (jobPostingId, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/favorites`,
    { job_posting_id: jobPostingId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

/**
 * 즐겨찾기 목록 요청
 * @param {string} token - 사용자 인증 토큰
 * @returns {Promise<Array>} - 즐겨찾기 목록 배열
 */
export const getFavorites = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/**
 * 즐겨찾기 삭제 요청
 * @param {number} jobPostingId - 삭제할 채용공고 ID
 * @param {string} token - 사용자 인증 토큰
 * @returns {Promise<Object>} - 삭제 결과 객체
 */
export const deleteFavorite = async (jobPostingId, token) => {
  const response = await axios.delete(`${API_BASE_URL}/favorites/${jobPostingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
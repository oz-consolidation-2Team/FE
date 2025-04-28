import axiosInstance from "./axiosInstance";

/**
 * 즐겨찾기 추가 요청
 * @param {number} jobPostingId - 즐겨찾기로 등록할 채용공고 ID
 * @param {string} token - 사용자 인증 토큰
 * @returns {Promise<Object>} - 즐겨찾기 생성 결과 객체
 */
export const addFavorite = async (jobPostingId) => {
  const response = await axiosInstance.post(
    `/favorites`,
    { job_posting_id: jobPostingId }
  );
  return response.data;
};

/**
 * 즐겨찾기 목록 요청
 * @param {string} token - 사용자 인증 토큰
 * @returns {Promise<Array>} - 즐겨찾기 목록 배열
 */
export const getFavorites = async () => {
  const response = await axiosInstance.get(`/favorites`);
  return response.data;
};

/**
 * 즐겨찾기 삭제 요청
 * @param {number} jobPostingId - 삭제할 채용공고 ID
 * @param {string} token - 사용자 인증 토큰
 * @returns {Promise<Object>} - 삭제 결과 객체
 */
export const deleteFavorite = async (jobPostingId) => {
  const response = await axiosInstance.delete(`/favorites/${jobPostingId}`);
  return response.data;
};
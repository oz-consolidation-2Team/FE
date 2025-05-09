import axiosPublicInstance from './axiosPublicInstance';

export const getSummaryFromAI = async (jobData) => {
  try {
    const response = await axiosPublicInstance.post('/ai/summarize', jobData); // baseURL 설정되어 있어야 함
    return response.data.data.summary; // 응답에서 요약문만 추출
  } catch (error) {
    console.error('AI 요약 API 호출 실패:', error);
    throw error;
  }
};
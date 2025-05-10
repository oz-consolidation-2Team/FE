import axiosPublicInstance from './axiosPublicInstance';

export const getSummaryFromAI = async (jobData) => {
  try {
    const response = await axiosPublicInstance.post('/ai/summarize', jobData);
    return response.data.data.summary;
  } catch (error) {
    console.error('AI 요약 API 호출 실패:', error);
    throw error;
  }
};

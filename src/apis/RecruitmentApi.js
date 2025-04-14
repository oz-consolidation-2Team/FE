import axios from "axios";

const BASE_URL = "https://apis.data.go.kr/1051000/recruitment/list";
const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;

/** 공공채용 정보를 조회하는 API 호출 함수 */
export const fetchPublicRecruitments = async (params) => {
  try {
    const response = await axios.get(BASE_URL, {
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

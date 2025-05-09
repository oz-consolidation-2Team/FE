import axiosFormInstance from './axiosFormInstance'
import axiosInstance from "./axiosInstance";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

export const companyMe = async () => {
    const response = await axiosInstance.get(`/company/me`)
    console.log('기업 마이 페이지 조회 API 호출====')
    console.log(response.data.data)
    return response.data.data
}

export const JobPosting = async (id) => {
    const response = await axiosInstance.get(`/posting/${id}`, {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        }
    })
    console.log('공고 상세 정보 API 호출====')
    console.log(response.data)
    return response.data
}

export const createJobPosting = async (formData) => {
    const response = await axiosFormInstance.post(`/posting/`, formData)
    console.log('공고 생성 API 호출====')
    console.log(response.data)
    return response.data
}

export const updateJobPosting = async (jobId, formData) => {
    const response = await axiosFormInstance.patch(`/posting/${jobId}`, formData)
    console.log('공고 수정 API 호출====')
    console.log(response.data)
    return response.data
}

export const deleteJobPosting = async (jobId) => {
  const response = await axiosInstance.delete(`/posting/${jobId}`);
  console.log('공고 삭제 API 호출====');
  console.log(response.data);
  return response.data;
};

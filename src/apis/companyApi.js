import axios from 'axios';
import axiosDev from "./axios.dev";
import axiosPublicInstance from "./axiosPublicInstance";
import axiosInstance from './axiosInstance';


const SERVICE_KEY = 'XorKwfsWyU1m5NFjoLu7/CG93NR551B8jKWDBiTuK50ONm1KG/YQZwYblKIzlIbi1lYO6Kc2PrWmeTOJmY/sCA==';
const BASE_URL = 'https://api.odcloud.kr/api/nts-businessman/v1/validate';

// 사업자등록번호 국세청 인증 API
export const verifyBusinessNumber = async (b_no, start_dt, p_nm) => {
  const response = await axios.post(`${BASE_URL}?serviceKey=${encodeURIComponent(SERVICE_KEY)}`, {
    businesses: [
      {
        b_no,
        start_dt,
        p_nm,
      },
    ],
  });

  return response.data;
};

// 사업자등록번호 중복확인 API
export const checkBizNumberDuplicate = async (bizNumber) => {
  try {
    const response = await axiosPublicInstance.get('/company/register/check-brn', {
      params: { business_reg_number: bizNumber },
    });
    return response.data;
  } catch (error) {
    console.error('사업자등록번호 중복확인 에러:', error.response?.data);
    throw error;
  }
};

// 기업 정보 조회 (유저)
export const CompaniesInfo = async (companyId) => {
  const response = await axiosInstance.get(`/companies/${companyId}`)
  return response.data.data
}

// 기업 정보 수정
export const CompanyEdit = async (formData) => {
  const response = await axiosInstance.patch(`/company/me`, formData)
  return response.data.data
}

// 기업 내 공고 이력서지원관리
export const resumeInquiryPosting = async () => {
  const response = await axiosInstance.get(`/applications/company`)
  return response.data
}

// 기업 탈퇴
export const companyDelete = async () => {
  const response = await axiosInstance.delete(`/company/me`)
  return response.data
}
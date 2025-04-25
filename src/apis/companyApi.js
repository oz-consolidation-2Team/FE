import axios from 'axios';

const SERVICE_KEY = 'XorKwfsWyU1m5NFjoLu7/CG93NR551B8jKWDBiTuK50ONm1KG/YQZwYblKIzlIbi1lYO6Kc2PrWmeTOJmY/sCA==';
const BASE_URL = 'https://api.odcloud.kr/api/nts-businessman/v1/validate';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

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

export const CompaniesInfo = async (companyId) => {
  const response = await axios.get(`${API_BASE_URL}companies/${companyId}`, {
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'accept': 'application/json'
    }
  })
  return response.data.data
}

export const CompanyEdit = async (formData) => {
  const response = await axios.patch(`${API_BASE_URL}company/me`, formData, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json'
    }
  })
  return response.data.data
}

export const resumeInquiryPosting = async () => {
  const response = await axios.get(`${API_BASE_URL}applications/company`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    }
  })
  return response.data
}
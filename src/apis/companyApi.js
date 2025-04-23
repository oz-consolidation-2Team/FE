import axios from 'axios';
import {TOKEN, BASE_URL} from "./token"

const SERVICE_KEY = 'XorKwfsWyU1m5NFjoLu7/CG93NR551B8jKWDBiTuK50ONm1KG/YQZwYblKIzlIbi1lYO6Kc2PrWmeTOJmY/sCA==';
const BASE_URL1 = 'https://api.odcloud.kr/api/nts-businessman/v1/validate';

export const verifyBusinessNumber = async (b_no, start_dt, p_nm) => {
  const response = await axios.post(`${BASE_URL1}?serviceKey=${encodeURIComponent(SERVICE_KEY)}`, {
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
  const response = await axios.get(`${BASE_URL}companies/${companyId}`, {
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'accept': 'application/json' }
  })
  return response.data.data
}

export const resumeInquiryPosting = async () => {
  const response = await axios.get(`${BASE_URL}applications/company`, {
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    }
  })
  return response.data
}
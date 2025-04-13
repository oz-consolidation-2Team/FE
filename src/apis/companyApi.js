import axios from 'axios';

const SERVICE_KEY = 'XorKwfsWyU1m5NFjoLu7/CG93NR551B8jKWDBiTuK50ONm1KG/YQZwYblKIzlIbi1lYO6Kc2PrWmeTOJmY/sCA==';
const BASE_URL = 'https://api.odcloud.kr/api/nts-businessman/v1/validate';

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

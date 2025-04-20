import axios from 'axios';

const API_BASE_URL = 'https://seonhm.kr';

export const signUpUser = async (form) => {
  console.log('[회원가입 요청]', `${API_BASE_URL}/user/register`);

  const response = await axios.post(`${API_BASE_URL}/user/register`, {
    name: form.name,
    email: form.email,
    password: form.password,
    phone_number: form.phone,
    birthday: form.birth,
    gender: form.gender,
    interests: form.interests,
    signup_purpose: form.purposes[0] || '',
    referral_source: form.channels[0] || '',
  });

  return response.data;
};

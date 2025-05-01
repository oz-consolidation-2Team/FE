import axiosInstance from "./axiosInstance";
import axiosPublicInstance from "./axiosPublicInstance";

// 개인 회원가입 API
export const signUpUserApi = async (form) => {
  console.log('[회원가입 요청]', '/user/register');

  const response = await axiosPublicInstance.post('/user/register', {
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

// 개인 회원가입 이메일 중복확인 API
export const checkUserEmailApi = async (email) => {
  const response = await axiosInstance.get('/check-email', {
    params: { email },
  });
  return response.data;
};

// 개인 이메일 찾기 API
export const findUserEmailApi = async (form) => {
  const response = await axiosInstance.post('/user/find_email', {
    name: form.name,
    phone_number: form.phone,
    birthday: form.birth,
  });
  return response.data;
};

// 개인 비밀번호 찾기 API
export const verifyUserInfoApi = async ({ email, name, phone_number, birthday }) => {
  const response = await axiosPublicInstance.post('/user/password/verify', {
    email,
    name,
    phone_number,
    birthday,
  });
  return response.data;
};

// 개인 비밀번호 재설정 API
export const resetUserPasswordApi = async ({ user_id, new_password, confirm_password }) => {
  const response = await axiosPublicInstance.post('/user/password/reset', {
    user_id,
    new_password,
    confirm_password,
  });
  return response.data;
};

// 개인 로그인 API
export const loginUserApi = async (email, password) => {

  const response = await axiosPublicInstance.post('/user/login', {
    email,
    password,
  });

  const { accesstoken, refreshtoken, user } = response.data.data;

  return {
    access_token: accesstoken,
    refresh_token: refreshtoken,
    user,
  };
};

// 개인 로그아웃 API
export const logoutUserApi = async () => {
  await axiosInstance.post('/user/logout');
};

// 기업 회원가입 API
export const signUpCompanyApi = async (form) => {
  const response = await axiosPublicInstance.post('/company/register',
    {
    email: form.email,
    password: form.password,
    confirm_password: form.passwordCheck,
    company_name: form.companyName,
    ceo_name: form.ceoName,
    opening_date: form.startDate.replace(/-/g, ''),
    business_reg_number: form.businessNumber,
    company_intro: form.companyDesc,
    manager_name: form.managerName,
    manager_phone: form.managerPhone.replace(/-/g, ''),
    manager_email: form.managerEmail,
  });

  return response.data;
};

// 기업 회원가입 이메일 중복확인 API
export const checkCompanyEmailApi = async (email) => {
  const response = await axiosInstance.get(`/company/register/check-email`, {
    params: { email },
  });
  return response.data;
};

// 기업 이메일 찾기 API
export const findCompanyEmailApi = async ({ ceoName, startDate, businessNumber }) => {
  const response = await axiosPublicInstance.post('/company/find-email', {
    ceo_name: ceoName,
    opening_date: startDate.replace(/-/g, ''),
    business_reg_number: businessNumber,
  });
  return response.data;
};

// 기업 비밀번호 찾기 API
export const verifyCompanyPasswordInfoApi = async ({ email, ceo_name, opening_date, business_reg_number }) => {
  const response = await axiosPublicInstance.post('/company/reset-password/verify', {
    email,
    ceo_name,
    opening_date,
    business_reg_number,
  });

  return response.data;
};

// 기업 비밀번호 재설정 API
export const resetCompanyPasswordApi = async ({ reset_token, new_password, confirm_password }) => {
  const response = await axiosPublicInstance.post('/company/reset-password', {
    reset_token,
    new_password,
    confirm_password,
  });
  return response.data;
};

// 기업 로그인 API
export const loginCompanyApi = async ({ email, password }) => {

  const response = await axiosPublicInstance.post('/company/login', {
    email,
    password,
  });

  const { access_token, refresh_token, company } = response.data.data;

  return {
    access_token,
    refresh_token,
    company,
  };
};

// 기업 로그아웃 API
export const logoutCompanyApi = async () => {
  await axiosInstance.post('/company/logout');
};

// 네이버 로그인 API
export const loginWithNaver = async (code, state) => {
  const response = await axiosPublicInstance.get('/auth/naver/login', {
    params: { code, state },
  });
  return response.data;
};

// 카카오 로그인 API
export const loginWithKakao = async (code) => {
  const response = await axiosPublicInstance.get('/auth/kakao/login', {
    params: { code },
  });
  return response.data;
};

import axiosInstance from "./axiosInstance";

// 개인 회원가입 API
export const signUpUserApi = async (form) => {
  console.log('[회원가입 요청]', '/user/register');

  const response = await axiosInstance.post('/user/register', {
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

// 개인 로그인 API
export const loginUserApi = async (email, password) => {

  const response = await axiosInstance.post('/user/login', {
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
  const response = await axiosInstance.post('/company/register',
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

// 기업 로그인 API
export const loginCompanyApi = async ({ email, password }) => {

  const response = await axiosInstance.post('/company/login', {
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
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

// 개인 로그인 API
export const loginUserApi = async (email, password) => {
  console.log('[로그인 요청]', '/user/login');

  const response = await axiosInstance.post('/user/login', {
    email,
    password,
  });

  console.log('[서버 응답]', response.data);

  const { accesstoken, refreshtoken, user } = response.data.data;

  return {
    access_token: accesstoken,
    refresh_token: refreshtoken,
    user,
  };
};


// 개인 로그아웃 API
export const logoutUserApi = async () => {
  console.log('[로그아웃 요청]', '/user/logout');
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
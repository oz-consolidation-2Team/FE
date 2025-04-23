import axiosInstance from "./axiosInstance";

// 회원가입
export const signUpUser = async (form) => {
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

// 로그인
export const loginUser = async (email, password) => {
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


// 로그아웃
export const logoutUser = async () => {
  console.log('[로그아웃 요청]', '/user/logout');
  await axiosInstance.post('/user/logout');
};


// 이메일 형식 검사
export const validateEmail = (email) =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

// 비밀번호: 8자 이상, 영문 + 숫자 + 특수문자 포함
export const validatePassword = (pw) =>
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(pw);

// 한글 포함 여부 검사
export const hasHangul = (text) =>
  /[\u3131-\u318E\uAC00-\uD7A3]/.test(text);

// 고정적인 두자리 숫자 ex) 7 -> 07
export const padZero = (num) =>
  num < 10 ? `0${num}` : `${num}`;

// 이름 공백 검사
export const validateName = (name) => name.trim() !== '';

// 전화번호 유효성 검사 (010-0000-0000 형식)
export const isValidPhone = (phone) =>
  /^010-\d{4}-\d{4}$/.test(phone);

// 생년월일 유효성 검사 (YYYY-MM-DD 형식)
export const isValidBirth = (birth) =>
  /^\d{4}-\d{2}-\d{2}$/.test(birth);

// 개업년월일 유효성 검사 (YYYY-MM-DD 형식)
export const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);

// 사업자등록번호: 숫자 10자리
export const isValidBizNumber = (value) =>
  /^\d{10}$/.test(value.replace(/-/g, ''));

// ✅ 1단계: 기본정보 검사
export const validateCompanyStep0 = (form, emailChecked) => {
  const errors = {};

  if (!validateEmail(form.email)) {
    errors.email = '이메일 형식이 올바르지 않습니다.';
  } else if (!emailChecked) {
    errors.email = '이메일 중복확인을 해주세요.';
  }

  if (!validatePassword(form.password)) {
    errors.password = '8자 이상, 영문+숫자+특수문자 포함';
  }

  if (form.password !== form.passwordCheck) {
    errors.passwordCheck = '비밀번호가 일치하지 않습니다.';
  }

  return errors;
};

// ✅ 2단계: 기업정보 검사
export const validateCompanyStep1 = (form) => {
  const errors = {};

  if (!form.companyName) {
    errors.companyName = '기업명을 입력해주세요.';
  }

  if (!form.ceoName) {
    errors.ceoName = '대표자명을 입력해주세요.';
  }

  if (!isValidDate(form.startDate)) {
    errors.startDate = 'YYYYNNDD 형식으로 입력해주세요.';
  }

  if (!form.businessNumber) {
    errors.businessNumber = '사업자등록번호를 입력해주세요.';
  }

  if (!form.bizVerified) {
    errors.businessNumber = '사업자등록번호 인증이 필요합니다.';
  }

  if (form.companyDesc.length < 50) {
    errors.companyDesc = '기업 소개를 최소 50자 이상 입력해주세요.';
  }

  return errors;
};

// ✅ 3단계: 담당자정보 검사
export const validateCompanyStep2 = (form) => {
  const errors = {};

  if (!form.managerName) errors.managerName = '담당자 성함을 입력해주세요.';
  if (!isValidPhone(form.managerPhone)) errors.managerPhone = '전화번호 형식이 올바르지 않습니다.';
  if (!validateEmail(form.managerEmail)) errors.managerEmail = '이메일 형식이 올바르지 않습니다.';

  return errors;
};

// 이메일 형식 검사
export const validateEmail = (email) =>
  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

// 비밀번호: 8자 이상, 영문 + 숫자 + 특수문자 포함
export const validatePassword = (pw) =>
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(pw);

// 한글 포함 여부 검사
export const hasHangul = (text) =>
  /[\u3131-\u318E\uAC00-\uD7A3]/.test(text);

// 이름 공백 검사
export const validateName = (name) => name.trim() !== '';

// 전화번호 유효성 검사 (010-0000-0000 형식)
export const isValidPhone = (phone) => /^010-\d{4}-\d{4}$/.test(phone);

// 생년월일 유효성 검사 (YYYY-MM-DD 형식, 단순 자리수 검사)
export const isValidBirth = (birth) => /^\d{4}-\d{2}-\d{2}$/.test(birth);

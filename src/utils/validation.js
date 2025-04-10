export const validateEmail = (email) =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  
  export const validatePassword = (pw) =>
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(pw);
  
  export const isValidPhone = (phone) => /^010-\d{4}-\d{4}$/.test(phone);
  
  export const isValidBirth = (birth) => /^\d{4}-\d{2}-\d{2}$/.test(birth);
  
  export const hasHangul = (text) =>
    /[\u3131-\u318E\uAC00-\uD7A3]/.test(text);
  
  export const validateName = (name) => name.trim() !== '';
  
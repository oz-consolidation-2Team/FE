// 전화번호 포맷 (예: 010-1234-5678)
export const formatPhoneNumber = (value) => {
    const numbersOnly = value.replace(/[^0-9]/g, '');
    if (numbersOnly.length <= 3) return numbersOnly;
    if (numbersOnly.length <= 7)
      return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
  };
  
  // 숫자만 받기 (사업자등록번호, 개업년월일 등)
  export const formatNumbersOnly = (value) =>
    value.replace(/[^0-9]/g, '');
  
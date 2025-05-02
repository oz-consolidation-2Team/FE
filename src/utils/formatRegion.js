import { KoreaRegions } from './KoreaRegions';

export const getSendableDistricts = (selectedDistricts) => {
  const result = [];

  selectedDistricts.forEach(({ city, district }) => {
    if (district.includes('전체')) {
      // ✅ 그대로 city + district 조합으로만 push
      result.push(`${city} ${district}`);
    } else {
      result.push(`${city} ${district}`);
    }
  });

  return result;
};

export const parseDesiredArea = (desiredAreaString) => {
  if (Array.isArray(desiredAreaString)) return desiredAreaString;
  if (typeof desiredAreaString !== 'string') return [];

  return desiredAreaString.split(',').map((item) => {
    const parts = item.trim().split(' ');

    // case 1: 정상적으로 "서울특별시 강남구"
    if (parts.length === 2) {
      return { city: parts[0], district: parts[1] };
    }

    // case 2: 전체가 포함된 단일 문자열일 경우 (ex: "부산전체")
    for (const city in KoreaRegions) {
      for (const district of KoreaRegions[city]) {
        if (item.trim() === `${city} ${district}` || item.trim() === district) {
          return { city, district };
        }
      }
    }

    // fallback
    return { city: '', district: '' };
  });
};

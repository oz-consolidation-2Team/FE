import { KoreaRegions } from './KoreaRegions';

export const getSendableDistricts = (selectedDistricts) => {
  const result = [];

  selectedDistricts.forEach(({ city, district }) => {
    if (district.includes('전체')) {
      const districts = KoreaRegions[city]?.[district] || [];
      districts.forEach((d) => result.push(`${city} ${d}`));
    } else {
      result.push(`${city} ${district}`);
    }
  });

  return result;
};

export const parseDesiredArea = (desiredAreaString) => {
  if (!desiredAreaString) return [];

  return desiredAreaString.split(',').map((item) => {
    const [city, district] = item.trim().split(' ');
    return { city, district };
  });
};

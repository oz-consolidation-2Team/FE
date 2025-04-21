import { KoreaRegions } from './KoreaRegions';

export const getSendableDistricts = (selectedDistricts) => {
  const result = [];

  selectedDistricts.forEach(({ city, district }) => {
    const regionData = KoreaRegions[city];

    if (district.includes('전체')) {
      const fullList = regionData?.[district] || [];
      fullList.forEach((d) => result.push({ city, district: d }));
    } else {
      result.push({ city, district });
    }
  });

  return result;
};

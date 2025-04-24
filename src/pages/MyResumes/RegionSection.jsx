import { useEffect, useState } from 'react';
import { KoreaRegions } from '@/utils/KoreaRegions';
import './MyResumes.scss';
import PropTypes from 'prop-types';

function RegionSection({ data, setData }) {
  const [selectedCity, setSelectedCity] = useState();
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [openCities, setOpenCities] = useState([]);
  const [isRegionOpen, setIsRegionOpen] = useState(false);

  // 태그 전체용 (선택된 '전체'만 보여주고 싶을 경우 사용 가능)
  const visibleTags = selectedDistricts;

  useEffect(() => {
    console.log('현재 선택된 지역 목록:', selectedDistricts);

    setData((prev) => ({ ...prev, preferredRegions: selectedDistricts }));
  }, [selectedDistricts, setData]);

  useEffect(() => {
    if (data.preferredRegions?.length > 0) {
      setSelectedDistricts(data.preferredRegions);
    }
  }, [data.preferredRegions]);

  const getDistrictList = (city) => {
    return city ? (KoreaRegions[city] ?? []) : [];
  };

  const handleChangeDistrict = (district, city = selectedCity) => {
    const isWhole = district.includes('전체');

    if (isWhole) {
      const alreadySelected = selectedDistricts.some(
        (item) => item.city === city && item.district === district
      );

      if (alreadySelected) {
        // 전체가 이미 선택된 경우 → 전체 태그 제거
        setSelectedDistricts(
          selectedDistricts.filter((item) => !(item.city === city && item.district === district))
        );
      } else {
        // 기존 선택 제거하고 '전체' 추가
        const others = selectedDistricts.filter((item) => item.city !== city);
        setSelectedDistricts([...others, { city, district }]);
      }
      return;
    }

    // 개별 구 클릭 처리
    const exists = selectedDistricts.some(
      (item) => item.city === city && item.district === district
    );

    if (exists) {
      setSelectedDistricts(
        selectedDistricts.filter((item) => !(item.city === city && item.district === district))
      );
    } else {
      // '전체'가 있다면 제거하고 개별 추가
      const withoutWhole = selectedDistricts.filter(
        (item) => !(item.city === city && item.district.includes('전체'))
      );
      setSelectedDistricts([...withoutWhole, { city, district }]);
    }
  };

  return (
    <div className="resumes_region">
      <h3 className="region_title">희망지역</h3>
      {isRegionOpen ? (
        <button className="region-toggle" onClick={() => setIsRegionOpen((prev) => !prev)}>
          지역 선택 닫기
        </button>
      ) : (
        <button className="region-toggle" onClick={() => setIsRegionOpen((prev) => !prev)}>
          지역 선택하기
        </button>
      )}

      {isRegionOpen ? (
        <div className="region_content">
          {/* 시/도 선택 */}
          <div className="city_list">
            {Object.keys(KoreaRegions).map((city) => (
              <button
                key={city}
                className={`city_item ${selectedCity === city ? 'selected' : ''}`}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </button>
            ))}
          </div>

          {/* 구/군 선택 */}
          {selectedCity && (
            <div className="district_list">
              <h4 className="district_title">{selectedCity}의 구/군</h4>
              <ul>
                {getDistrictList(selectedCity).map((district) => (
                  <li key={district}>
                    <button
                      className={`district_item ${
                        selectedDistricts.some(
                          (item) => item.city === selectedCity && item.district === district
                        )
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() => handleChangeDistrict(district)}
                    >
                      {district}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        ''
      )}

      {/* 선택 태그 보여주기 */}
      {selectedDistricts.length > 0 && (
        <div className="selected_tags">
          {visibleTags.map((item) => (
            <p
              key={`${item.city}-${item.district}`}
              className="tag"
              onClick={() => handleChangeDistrict(item.district, item.city)}
            >
              {item.city} &gt; {item.district}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default RegionSection;

RegionSection.propTypes = {
  data: PropTypes.shape({
    preferredRegions: PropTypes.array,
    // 다른 formData 필드도 여기에 추가 가능
  }).isRequired,
  setData: PropTypes.func.isRequired,
};

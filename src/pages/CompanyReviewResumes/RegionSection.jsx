import { useEffect, useState } from 'react';
import './CompanyReviewResumes.scss';
import PropTypes from 'prop-types';

function RegionSection({ data, setData }) {
  const [selectedDistricts, setSelectedDistricts] = useState([]);

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

  return (
    <div className="review_resumes_region">
      <h3 className="review_region_title">희망지역</h3>

      {/* 선택 태그 보여주기 */}
      {selectedDistricts.length > 0 && (
        <div className="review_selected_tags">
          {visibleTags.map((item) => (
            <p key={`${item.city}-${item.district}`} className="tag">
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

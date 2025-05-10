import { useEffect, useState } from 'react';
import './CompanyReviewResumes.scss';
import PropTypes from 'prop-types';

function RegionSection({ data }) {
  const visibleTags = data.desired_area ? data.desired_area.split(', ') : undefined;

  return (
    <div className="review_resumes_region">
      <h3 className="review_region_title">희망지역</h3>

      {/* 선택 태그 보여주기 */}
      {visibleTags ? (
        <div className="review_selected_tags">
          {visibleTags.map((item) => (
            <p key={`${item.split(' ')[0]}-${item.split(' ')[1]}`} className="tag">
              {item.split(' ')[0]} &gt; {item.split(' ')[1]}
            </p>
          ))}
        </div>
      ) : <p>희망 지역 없음</p>}
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

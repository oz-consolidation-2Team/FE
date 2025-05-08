import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import './HolidayInfo.scss';

const HolidayInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <span className="info-icon-trigger" onClick={() => setIsOpen(true)}>
        <FaInfoCircle title="주휴수당 안내" />
      </span>

      {isOpen && (
        <div className="holiday-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="holiday-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="holiday-title">주휴수당</h2>
            <hr className="holiday-divider" />

            <h2 className="holiday-subtitle">주휴수당 지급 대상자</h2>
            <p className="holiday-description">일주일 동안 15시간 이상 '개근'한 모든 근로자</p>

            <h2 className="holiday-subtitle">주휴수당 계산 (1주 기준)</h2>
            <p className="holiday-formula">(1주일 총 일한시간 / 40시간 ) x 8 x 시급</p>
            <p className="holiday-note">단, 40시간 이상 근무한 경우에도 최대 40시간까지만 계산되어 적용됩니다.</p>

            <h2 className="holiday-subtitle">주휴수당 지급 기준 시간이 최대 40시간인 이유는?</h2>
            <p className="holiday-note">만 18세 이상 성인근로자의 경우 법정근로시간이 1일 8시간, 1주일 40시간을 의미하기 때문입니다. 법정근로시간에 따라 주휴수당은 최대 40시간까지 계산 가능합니다.</p>

            <button className="close-button" onClick={() => setIsOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default HolidayInfo;
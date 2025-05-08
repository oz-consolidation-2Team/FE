import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import './TaxInfo.scss';

const TaxInfo = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="label-row">
        <label>세금 공제</label>
        <button
          type="button"
          className="info-icon-trigger"
          onClick={() => setShowModal(true)}
        >
          <FaInfoCircle />
        </button>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="tax-title">세금공제</h3>
            <hr className="tax-divider" />
            <h4 className="tax-subtitle">1. 4대보험료 공제 9.4%</h4>
            <p className="tax-description">4대보험에 가입하여 세금을 적용할 경우, 공제되는 금액</p>
            <table className="tax-table">
              <thead>
                <tr>
                  <th>4대 보험</th>
                  <th>근로자(급여공제)</th>
                  <th>사업주</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>국민연금 (9%)</td>
                  <td>4.5%</td>
                  <td>4.5%</td>
                </tr>
                <tr>
                  <td>건강보험 (7.09%)</td>
                  <td>3.545%</td>
                  <td>3.545%</td>
                </tr>
                <tr>
                  <td>장기요양보험 (0.9182%)</td>
                  <td>0.4591%</td>
                  <td>0.4591%</td>
                </tr>
                <tr>
                  <td>고용보험</td>
                  <td>0.9%</td>
                  <td>기업규모별 상이</td>
                </tr>
                <tr>
                  <td>산재보험</td>
                  <td>없음<br />(전액회사부담)</td>
                  <td>업종별 상이</td>
                </tr>
              </tbody>
            </table>
            <p className="tax-note">· 주 15시간 (월 60시간) 미만 근로자는 4대보험 가입대상이 아닙니다.</p>
            <h4 className="tax-subtitle">2. 소득세 공제 3.3%</h4>
            <div className="formula-box">소득세 3% + 지방소득세 (소득세의 10%)</div>
            <p className="tax-description">소득세를 공제받은 경우, 5월 종합소득세 신고기간에 소득을 신고하여, 신고금액에 따라 환급이 가능합니다.</p>
            <button className="close-button" onClick={() => setShowModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TaxInfo;
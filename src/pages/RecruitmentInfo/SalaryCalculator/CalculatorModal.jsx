import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './CalculatorModal.scss';
import { timeOptions } from '@/utils/checktime';
import HolidayInfo from './HolidayInfo';
import TaxInfo from './TaxInfo';

export const CalculatorModalContent = ({
  salary,
  payment_method,
  work_days,
  work_start_time,
  work_end_time,
  id
}) => {
  // 사용자 입력 관련 상태값들
  const [wageInput, setWageInput] = useState('');
  const wage = Number(wageInput);
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [applyTax, setApplyTax] = useState(false);
  const [baseMethod, setBaseMethod] = useState(payment_method || '시급');
  const [targetMethod, setTargetMethod] = useState('월급');
  const [showHolidayPay, setShowHolidayPay] = useState(false);

  // 공고 데이터로 초기값 설정
  useEffect(() => {
    if (salary > 0) {
      setWageInput(String(salary));
    }

    if (work_days) {
      const dayCount = work_days.split(',').length;
      setDaysPerWeek(dayCount);
    } else {
      setDaysPerWeek('');
    }

    setBaseMethod(payment_method || '시급');

    if (
      work_start_time &&
      work_end_time &&
      work_start_time.includes(':') &&
      work_end_time.includes(':')
    ) {
      const [sh, sm] = work_start_time.split(':').map(Number);
      const [eh, em] = work_end_time.split(':').map(Number);
      const hours = (eh + (em || 0) / 60) - (sh + (sm || 0) / 60);
      if (!isNaN(hours) && hours > 0) {
        setHoursPerDay(Number(hours.toFixed(2)));
      }
    } else {
      setHoursPerDay('');
    }
  }, [salary, payment_method, work_days, work_start_time, work_end_time]);

  const totalWeeklyHours = hoursPerDay * daysPerWeek;

  const avgMonthlyHours = hoursPerDay * daysPerWeek * 4.345; // 1달 평균 근무시간

  // 단위 변환 함수: 시급 ↔ 일급, 주급, 월급, 연봉
  const convertSalary = (value, from, to) => {
    const H = Number(hoursPerDay);
    const D = Number(daysPerWeek);
    const W = 4.345; // 평균 월 주수
    const M = 12; // 연간 월수

    // Defensive: if H or D is falsy, zero, NaN, or invalid, return 0
    if (!H || !D || isNaN(H) || isNaN(D)) return 0;

    const hourly = {
      시급: value,
      일급: value / H,
      주급: value / (H * D),
      월급: value / (H * D * W),
      연봉: value / (H * D * W * M),
    }[from];

    const result = {
      시급: hourly,
      일급: hourly * H,
      주급: hourly * H * D,
      월급: hourly * H * D * W,
      연봉: hourly * H * D * W * M,
    }[to];

    return isNaN(result) ? 0 : result;
  };

  // 세금 계산
  const tax = applyTax ? Math.round(wage * taxRate) : 0;
  // const total = totalBase - tax;

  // 기준 시급 계산: 입력 급여 단위에 따라 시급으로 환산
  const hourly = baseMethod === '시급'
    ? wage
    : baseMethod === '일급'
    ? wage / hoursPerDay
    : baseMethod === '주급'
    ? wage / (hoursPerDay * daysPerWeek)
    : baseMethod === '월급'
    ? wage / (hoursPerDay * daysPerWeek * 4.345)
    : baseMethod === '연봉'
    ? wage / (hoursPerDay * daysPerWeek * 4.345 * 12)
    : wage;
  // 주휴수당 주 단위 계산 (법정 기준에 따라 최대 40시간 기준)
  let weeklyHolidayPay = 0;
  if (totalWeeklyHours >= 15) {
    const effectiveHours = Math.min(totalWeeklyHours, 40);
    weeklyHolidayPay = (effectiveHours / 40) * 8 * hourly;
  }
  const baseMonthlyHolidayPay = weeklyHolidayPay * 4;
  // 주휴수당을 선택된 단위로 환산
  const holidayPayConverted =
    targetMethod === '월급'
      ? baseMonthlyHolidayPay
      : targetMethod === '주급'
      ? baseMonthlyHolidayPay / 4
      : targetMethod === '일급'
      ? baseMonthlyHolidayPay / (4 * daysPerWeek)
      : targetMethod === '시급'
      ? baseMonthlyHolidayPay / (4 * daysPerWeek * hoursPerDay)
      : targetMethod === '연봉'
      ? baseMonthlyHolidayPay * 12
      : baseMonthlyHolidayPay;

  return (
    <div className="calculator-modal-overlay">
      <div className="calculator-modal">
        <h2 className="calculator-title">급여 계산기</h2>
        <p className="minimum-wage-info"><strong>2025년 최저시급은 <span className="highlight">10,030</span>원입니다.</strong></p>

        {/* 기준 급여 단위 선택 */}
        <div className="form-group">
          <label>기준 급여 단위</label>
          <select value={baseMethod} onChange={(e) => setBaseMethod(e.target.value)}>
            {['시급', '일급', '주급', '월급', '연봉'].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* 급여 금액 입력 */}
        <div className="form-group">
          <label>급여 금액</label>
          <input
            type="text"
            value={document.activeElement && document.activeElement === document.getElementById('wage-input') ? wageInput : Number(wageInput).toLocaleString()}
            id="wage-input"
            onFocus={e => {
              // Remove formatting on focus
              e.target.value = wageInput;
            }}
            onBlur={e => {
              // Show formatted value on blur
              e.target.value = Number(wageInput).toLocaleString();
            }}
            onChange={(e) => {
              const numeric = e.target.value.replace(/[^0-9]/g, '');
              setWageInput(numeric);
            }}
          />
        </div>

        {/* 변환할 단위 선택 */}
        <div className="form-group">
          <label>변환할 단위</label>
          <select value={targetMethod} onChange={(e) => setTargetMethod(e.target.value)}>
            <option value="">변환할 단위를 선택하세요</option>
            {['시급', '일급', '주급', '월급', '연봉'].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* 일일 근무시간 */}
        <div className="form-group">
          <label>일일 근무시간</label>
          <select
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
          >
            <option value="">선택하세요</option>
            {timeOptions.map(({ value }) => {
              const [hourStr, minuteStr] = value.split(':');
              const hour = Number(hourStr);
              const minute = Number(minuteStr);
              const label =
                minute === 0
                  ? `${hour}시간`
                  : `${hour}시간 ${minute}분`;

              return (
                <option key={value} value={hour + (minute === 30 ? 0.5 : 0)}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        {/* 주간 근무일수 */}
        <div className="form-group">
          <label>주간 근무일수</label>
          <select
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(Number(e.target.value))}
          >
            <option value="">선택하세요</option>
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <option key={day} value={day}>
                {day}일
              </option>
            ))}
          </select>
        </div>

        {/* 세금 공제 선택 */}
        <div className="form-group">
          <div className="label-row">
            <label className="tax-label">세금 공제</label>
            <TaxInfo />
          </div>
          <select value={taxRate} onChange={(e) => {
            const val = Number(e.target.value);
            setTaxRate(val);
            setApplyTax(val > 0);
          }}>
            <option value={0}>미적용</option>
            <option value={0.033}>소득세 3.3%</option>
            <option value={0.094}>4대 보험 9.4%</option>
          </select>
        </div>

        {/* 주휴수당 체크 여부 */}
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={showHolidayPay}
              onChange={() => setShowHolidayPay(!showHolidayPay)}
            />
            주휴수당 계산 포함
          </label>
          <HolidayInfo />
        </div>

        <hr />
        {/* 결과 영역: 변환 급여, 세금, 주휴수당, 최종금액 */}
        <div className="result">
            {targetMethod && (
              <p>
                {targetMethod}: {Math.round(
                  convertSalary(wage, baseMethod, targetMethod)
                ).toLocaleString()}원
              </p>
            )}
          {applyTax && (
            <p>
              세금: {targetMethod
                ? Math.round(convertSalary(wage, baseMethod, targetMethod) * taxRate).toLocaleString()
                : tax.toLocaleString()}원 -
            </p>
          )}
          {showHolidayPay && (
            <p>
              주휴수당: {Math.round(holidayPayConverted).toLocaleString()}원 +
            </p>
          )}
          {(applyTax || showHolidayPay) && <hr />}
          {targetMethod && (applyTax || showHolidayPay) && (
            <p className="final-amount">최종예상금액 : {Math.round(
              convertSalary(wage, baseMethod, targetMethod)
              * (1 - (applyTax ? taxRate : 0))
              + (showHolidayPay ? holidayPayConverted : 0)
            ).toLocaleString()}원</p>
          )}
        </div>
      </div>
    </div>
  );
};

const CalculatorModal = ({ job, onClose }) => {
  if (!job) return null;
  const [containerEl] = useState(() => document.createElement('div'));
  const [modalWindow, setModalWindow] = useState(null);

  useEffect(() => {
    const newWindow = window.open('', '', 'width=600,height=800,left=200,top=200');
    setModalWindow(newWindow);

    if (newWindow) {
      newWindow.document.body.appendChild(containerEl);
      newWindow.document.title = '급여 계산기';
      document.querySelectorAll('style, link[rel="stylesheet"]').forEach((node) => {
        newWindow.document.head.appendChild(node.cloneNode(true));
      });
    }

    const timer = setInterval(() => {
      if (newWindow.closed) {
        onClose();
        clearInterval(timer);
      }
    }, 500);

    return () => {
      if (newWindow && !newWindow.closed) {
        newWindow.close();
      }
      clearInterval(timer);
    };
  }, [containerEl, onClose]);

  if (!modalWindow) return null;

  return ReactDOM.createPortal(
    <CalculatorModalContent
      salary={job.salary}
      payment_method={job.payment_method}
      work_days={job.work_days}
      work_start_time={job.work_start_time}
      work_end_time={job.work_end_time}
      id={job.id}
      onClose={onClose}
    />,
    containerEl
  );
};

export default CalculatorModal;

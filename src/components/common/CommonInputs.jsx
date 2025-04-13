import React from 'react';
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';
import ErrorMessage from './ErrorMessage';

export const BasicInput = ({ label, name, value, onChange, error, placeholder }) => (
  <div className="form_group">
    <label>{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={error ? 'error' : ''}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </div>
);

export const EmailInputWithCheck = ({ value, onChange, onCheck, error }) => (
  <div className="form_group">
    <label>이메일</label>
    <div className="input_row">
      <input
        name="email"
        value={value}
        onChange={onChange}
        placeholder="이메일을 입력하세요"
        className={error ? 'error' : ''}
      />
      <button type="button" onClick={onCheck}>중복확인</button>
    </div>
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </div>
);

export const PasswordInput = ({ label, name, value, onChange, show, onToggle, error }) => (
  <div className="form_group">
    <label>{label}</label>
    <div className="password_row">
      <input
        type={show ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="영문+숫자+특수문자 8자 이상"
        className={error ? 'error' : ''}
      />
      <span className="eye_icon" onClick={onToggle}>
        {show ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
      </span>
    </div>
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </div>
);

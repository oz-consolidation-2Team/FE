import React from 'react';
import ErrorMessage from '@/components/common/ErrorMessage';
import './LabeledInput.scss';

const LabeledInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  inputMode = 'text',
  disabled = false,
  readOnly = false,
  autoComplete = 'off',
  className = '',
}) => {
  return (
    <div className="form_group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        className={`${className} ${error ? 'error' : ''}`.trim()}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default LabeledInput;
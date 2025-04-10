import './ErrorMessage.scss';

const ErrorMessage = ({ children }) => {
  return <p className="error_msg">{children}</p>;
};

export default ErrorMessage;

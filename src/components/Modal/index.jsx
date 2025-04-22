import PropTypes from 'prop-types';
import './Modal.scss';

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func, // 안 쓸 수도 있으니 필수는 아님
  children: PropTypes.node, // children은 node로 받아야 함!
};

function Modal({ isOpen, onClose, title, description, buttons }) {
  //isOpen : boolean ( isOpen이 false면 렌더링 하지 않음  )
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        {title && <h3>{title}</h3>}
        {description && <p>{description}</p>}
        <div className="modal_buttons">
          {Array.isArray(buttons)
            ? buttons.map((btn, i) => (
                <button key={i} onClick={btn.onClick} className={`modal_btn ${btn.className}`}>
                  {btn.label}
                </button>
              ))
            : buttons}
        </div>
      </div>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  buttons: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
      })
    ),
  ]),
};

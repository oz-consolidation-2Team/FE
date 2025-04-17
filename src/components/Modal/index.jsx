import PropTypes from 'prop-types';

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func, // 안 쓸 수도 있으니 필수는 아님
  children: PropTypes.node, // children은 node로 받아야 함!
};

function Modal({ isOpen, onClose, children }) {
  //isOpen : boolean ( isOpen이 false면 렌더링 하지 않음  )
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        {children}
        {/* 버튼을 포함한 전체를 children으로 */}
      </div>
    </div>
  );
}

export default Modal;

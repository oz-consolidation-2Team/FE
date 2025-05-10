import PropTypes from 'prop-types';

/**
 * @param {'add' | 'edit' | 'delete' | 'delete-Success'} modalType 모달 타입
 */
export default function Title (props) {
    return <h1>{props.modalType === 'delete' ? (
        <>
            해당 공고와 등록된 이력서가 삭제됩니다
            <br />
            삭제하시겠습니까?
        </>
    )
        : `공고 ${props.modalType === 'add' ? "등록" : "수정"}이 완료되었습니다`
    }</h1>
}

Title.propTypes = {
    modalType: PropTypes.oneOf(['add', 'edit', 'delete', 'delete-Success'])
}
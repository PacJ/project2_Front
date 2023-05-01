import Modal from 'react-modal';

Modal.setAppElement('#root'); // 이 부분은 루트 요소를 설정합니다. 이 예에서는 index.html에 있는 'root' 요소입니다.

const CommentModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Details"
      className="CommentModal"
      overlayClassName="CommentOverlay"
    >
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="ml-4 mt-4" style={{fontWeight:'bold'}}>스즈메의 문단속</h5>
        <button aria-label="Close" className="close mr-4 mt-2" type="button" onClick={onRequestClose}>
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="p-2">
        <textarea className="form-control border-0" rows="15" placeholder="이 작품에 대한 생각을 자유롭게 남겨주세요"></textarea>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="spoilerCheck" />
          <label className="form-check-label" htmlFor="spoilerCheck">
            Spoiler
          </label>
        </div>
        <button className="btn btn-primary mr-4 mb-3">Write</button>
      </div>
    </Modal>
  );
};

export default CommentModal;

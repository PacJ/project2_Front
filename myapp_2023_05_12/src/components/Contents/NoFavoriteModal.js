import Modal from 'react-modal';

Modal.setAppElement('#root');

const NoFavoriteModal = ({ isOpen, onRequestClose, onConfirm, onCancel }) => {
  const handleConfirm = () => {
    onConfirm(true);
  }

  const handleCancel = () => {
    onCancel(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="NoFavorite"
      className="NoFavoriteModal"
      overlayClassName="NoFavoriteOverlay"
    >
      <div>
        <div>
          <h4>아직 등록된 인생영화가 없습니다. 이 영화를 등록하시겠습니까?</h4>
        </div>
        <div className='d-flex justify-content-center align-items-center m-2'>
          <button className='btn mr-2' onClick={handleConfirm}>확인</button>
          <button className='btn' onClick={handleCancel}>취소</button>
        </div>
      </div>
    </Modal>

  );
}

export default NoFavoriteModal;
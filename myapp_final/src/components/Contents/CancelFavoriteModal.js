import Modal from 'react-modal';

Modal.setAppElement('#root');

const CancelFavoriteModal = ({ isOpen, onRequestClose, onConfirm, onCancel }) => {
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
      className="CancelFavoriteModal"
      overlayClassName="NoFavoriteOverlay"
    >
      <div>
        <div className='text-center mb-5'>
          <h4>인생영화를 취소하시겠습니까?</h4>
        </div>
        <div className='d-flex justify-content-center align-items-center m-2'>
          <button className='btn mr-2' onClick={handleConfirm}>확인</button>
          <button className='btn' onClick={handleCancel}>취소</button>
        </div>
      </div>
    </Modal>
  )
}

export default CancelFavoriteModal;
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ChangeFavoriteModal = ({ isOpen, onRequestClose, onConfirm, onCancel, currentFavorite }) => {
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
          <div>현재 인생영화는 {currentFavorite.title} 입니다.</div>
          <h4>인생영화를 바꾸시겠습니까?</h4>
        </div>
        <div className='d-flex justify-content-center align-items-center m-2'>
          <button className='btn mr-2' onClick={handleConfirm}>확인</button>
          <button className='btn' onClick={handleCancel}>취소</button>
        </div>
      </div>
    </Modal>
  )
}

export default ChangeFavoriteModal;
import Modal from 'react-modal';

const DeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onCancel} 
      contentLabel="Delete"
      className="DeleteModal"
      overlayClassName="DeleteOverlay"
    >
      <div>
        <div className='d-flex justify-content-center'>
          <h3>정말로 삭제하시겠습니까?</h3>
        </div>
        <div className='d-flex justify-content-center align-items-center m-2'>
          <button className='btn mr-2' onClick={onConfirm}>확인</button>
          <button className='btn' onClick={onCancel}>취소</button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
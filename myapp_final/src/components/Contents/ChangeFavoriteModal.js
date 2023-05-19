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
      className="ChangeFavoriteModal"
      overlayClassName="NoFavoriteOverlay"
    >
      <div className='m-2'>
        <div style={{ width: '100%', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '150px', marginRight: '20px', marginTop:'20px', marginBottom:'20px'}}>
              <img src={`https://image.tmdb.org/t/p/w200/${currentFavorite.poster_path}`} alt="Movie Poster" style={{ width: '100%', height: 'auto', borderRadius:'3px' }} />
            </div>
            <div>
              <h5 style={{ margin: '10px 40px' }}>현재 인생영화</h5>
              <div className='' style={{color:'#e75757', fontWeight:'bold', fontSize:'1.8em'}}>{currentFavorite.title}</div>
              <h5 style={{ margin: '10px 40px' }}>바꾸시겠습니까?</h5>
            </div>
          </div> 
        </div>

        <div className='d-flex justify-content-center align-items-center mt-4'>
          <button className='btn mr-2' onClick={handleConfirm}>확인</button>
          <button className='btn' onClick={handleCancel}>취소</button>
        </div>
      </div>
    </Modal>
  )
}

export default ChangeFavoriteModal;
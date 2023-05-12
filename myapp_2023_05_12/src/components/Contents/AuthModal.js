import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';

Modal.setAppElement('#root');

const AuthModal = ({isOpen, onRequestClose}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Auth"
      className="AuthModal"
      overlayClassName="AuthOverlay"
    >
      <div>
        <div className='d-flex justify-content-center'>
          <h3>로그인이 필요한 서비스입니다.</h3>
        </div>
        <div className='buttons d-flex flex-column justify-content-center align-items-center'>
          <NavLink className='btn login-button my-3' to="/login">로그인</NavLink>
          <NavLink className="btn register-button" to="/register">회원가입</NavLink>
        </div>
      </div>
    </Modal>
  )
}

export default AuthModal;
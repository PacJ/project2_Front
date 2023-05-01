import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from 'reactstrap';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../assets/css/commentmodal.css';
import CommentModal from 'components/Comment/CommentModal';

Modal.setAppElement('#root'); // 이 부분은 루트 요소를 설정합니다. 이 예에서는 index.html에 있는 'root' 요소입니다.

const ReviewModal = ({ show, handleClose, movie }) => {
  const [comment, setComment] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const commentClose = () => {
    setComment(false);
    handleClose();
    setSelectedMovie(null);
  }

  const commentShow = (movie) => {
    setSelectedMovie(movie);
    setComment(true);
  }
  
  return (
    <div>
      <Modal
        isOpen={show}
        onRequestClose={handleClose}
        contentLabel="상세정보"
        className="Modal"
        overlayClassName="Overlay"
      >
        {movie && (
          <>
            <div className="p-3 border-bottom">
              <p>제목: {movie.title}</p>
              <p>개봉 연도: {movie.release_date}</p>
            </div>
            <div className='row'>
              <div className="col d-flex justify-content-center align-items-center">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="m-3"
                  size="3x"
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div className="col d-flex justify-content-center align-items-center">
                <FontAwesomeIcon
                  icon={faComment}
                  className="m-3"
                  size="3x"
                  style={{ cursor: 'pointer' }}
                  onClick={() => commentShow(movie)}

                />
              </div>
            </div>
            <div className='row mb-3'>
              <div className='col d-flex justify-content-center align-items-center'>
                <div>보고싶어요</div>
              </div>
              <div className='col d-flex justify-content-center align-items-center'>
                <div>코멘트 남기기</div>
              </div>
            </div>
          </>
        )}
        <div className='modal-footer'>
          <Button className="m-3" color="primary" onClick={handleClose}>취소</Button>
        </div>
      </Modal>

      <CommentModal isOpen={comment} onRequestClose={commentClose} movie={selectedMovie} />
    </div>
  );
};

export default ReviewModal;

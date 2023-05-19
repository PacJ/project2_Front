import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Button } from 'reactstrap';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../assets/css/modal.css';
import CommentModal from 'components/Comment/CommentModal';
import { useDispatch, useSelector } from 'react-redux';
import { MovieActions } from 'reduxs/Actions/MovieAction';
import useComment from 'components/Contents/useComment';

Modal.setAppElement('#root');

const ReviewModal = ({ detailShow, handleDetailClose, movie, wishChecked, setWishChecked }) => {
  const dispatch = useDispatch();
  const member_id = localStorage.getItem('member_id');
  const movie_id = movie && movie.movie_id;

  //const [memberReview, setMemberReview] = useState(null);
  const memberReview = useSelector((state) => state.movie.memberReview);
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (movie_id && member_id) {
      dispatch(MovieActions.getReviewByMemberId(movie_id, member_id))
        .then((res) => {
          if (res.data) {
            //setMemberReview(res.data);
          } else {
            //setMemberReview(null);
          }
        });
    }
  }, [movie_id, dispatch, detailShow, handleDetailClose]);

  useEffect(() => {
    if (memberReview && memberReview.content) {
      setValue(true);
      setComment(memberReview.content);
      setIsSpoiler(memberReview.state);
      setIsEditMode(true);
    } else {
      setValue(false);
      setComment('');
      setIsSpoiler(1);
      setIsEditMode(false);
    }
  }, [memberReview]);
  

  const {
    comment,
    isSpoiler,
    isEditMode,
    show,
    isDropdownVisible,
    showDeleteModal,
    setComment,
    setIsSpoiler,
    setIsEditMode,
    setShow,
    setIsDropdownVisible,
    setShowDeleteModal,
    handleShow,
    handleClose,
    handleDelete,
    handleConfirmDelete,
    handleCancelDelete,
    handleCommentClick,
  } = useComment(undefined, undefined, handleDetailClose, movie_id, member_id);

  // 보고싶어요 처리
  const handleWishChange = async (movie_id) => {
    const wishDTO = {
      movie_id: movie_id,
      member_id: member_id,
    }

    const currentWishState = wishChecked[movie_id] || false;

    if (currentWishState) {
      await dispatch(MovieActions.deleteWish(movie_id, member_id));
      handleDetailClose('', movie_id);
    } else {
      await dispatch(MovieActions.postWish(wishDTO));
      handleDetailClose('보고싶어요', movie_id);
    }

    setWishChecked(prev => ({
      ...prev,
      [movie_id]: !currentWishState
    }));
  }
  
  return (
    <div>
      <Modal
        isOpen={detailShow}
        onRequestClose={handleDetailClose}
        contentLabel="상세정보"
        className="MovieDetailModal"
        overlayClassName="MovieDetailOverlay"
      >
        {movie && (
          <>
            <div className="p-3 border-bottom">
              <p>제목: {movie.title}</p>
              <p>개봉 연도: {movie.release_date}</p>
            </div>
            <div className='d-flex justify-content-center align-items-center mb-3'>
              <div className="px-3 mr-4" >
                <div>
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="m-3"
                    size="3x"
                    onClick={() => handleWishChange((movie.movie_id))}
                    style={wishChecked[movie.movie_id] ? { color: '#fc8080', cursor: 'pointer' } : { cursor: 'pointer' }}
                  />
                </div>
                <div className='text-center'>
                  보고싶어요
                </div>
              </div>
              <div className="px-3">
                <div>
                  <FontAwesomeIcon
                    icon={faComment}
                    className="m-3"
                    size="3x"
                    style={{ cursor: 'pointer', color: value ? '#fc8080' : undefined }}
                    onClick={() => handleShow(value)}
                  />
                </div>
                <div>
                  {value ? '코멘트 수정' : '코멘트 남기기'}
                </div>
              </div>
            </div>
          </>
        )}
        <div className='modal-footer'>
          <Button className="m-3" color="primary" onClick={handleDetailClose}>취소</Button>
        </div>
      </Modal>
      <CommentModal isOpen={show} onRequestClose={handleClose} movie={movie} comment={comment} isSpoiler={isSpoiler} isEditMode={isEditMode} setComment={setComment} setIsSpoiler={setIsSpoiler} handleDetailClose={handleDetailClose} />
      {/* isOpen, onRequestClose, movie = {}, fetchComments, comment, setComment, setIsSpoiler, isSpoiler, isEditMode */}
    </div>
  );
};

export default ReviewModal;

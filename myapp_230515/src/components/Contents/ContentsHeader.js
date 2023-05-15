import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MovieActions } from 'reduxs/Actions/MovieAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faStar } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import MovieRating from './MovieRating';
import CommentDropdown from './CommentDropdown';
import CommentModal from 'components/Comment/CommentModal';
import DeleteModal from './DeleteModal';
import MemberWish from './MemberWish';
import MemberReviewInfo from './MemberReviewInfo';
import MemberFavorite from './MemberFavorite';

const BannerOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: blur(6px);
    z-index: 1;
    background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  `;

const ContentsHeader = ({ contents = {}, fetchComments, handleAuthShow }) => {
  const dispatch = useDispatch();
  const memberReview = useSelector((state) => state.movie.memberReview);

  const hasComment = memberReview && memberReview.content;
  const member_id = localStorage.getItem('member_id');

  // memberReview가 아직 전달되지 않았을 수 있으므로 확인 후 state를 초기화 해야함
  const [comment, setComment] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);

  // 코멘트작성 버튼 > 모달
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setComment('');
  };
  const handleShow = (editMode = false) => {
    setIsEditMode(editMode);
    if (editMode) {
      setComment(memberReview.content);
      setIsSpoiler(memberReview.state);
    }
    setShow(true);
  };

  // 코멘트작성 버튼 > 수정/삭제 드롭다운 메뉴
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // 삭제 모달
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCancelDelete = () => setShowDeleteModal(false);
  const handleConfirmDelete = () => {
    dispatch(MovieActions.deleteComment(memberReview.movie_id, memberReview.member_id));
    setShowDeleteModal(false);
    setComment('');
    fetchComments();
  }
  
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  // 코멘트 작성 버튼
  const handleCommentClick = () => {
    if (!member_id) {
      // 로그아웃 상태일 때: auth 모달
      handleAuthShow();
    } else if (hasComment) {
      // 로그인 상태이며 기존 작성 comment가 있을 때: 수정/삭제 드롭다운 메뉴
      setIsDropdownVisible(!isDropdownVisible);
    } else {
      // 로그인 상태이며 기존 작성 comment가 없을 때: 코멘트 작성 모달창
      handleShow();
    }
  }

  // 인생영화

  return (
    <>
      <div className="banner-container">
        <BannerOverlay imageUrl={`https://image.tmdb.org/t/p/original/${contents.backdrop_path}`}></BannerOverlay>
        <img src={`https://image.tmdb.org/t/p/original/${contents.backdrop_path}`} alt="Main" className="banner-image" />
      </div>
      <Container>
        <Row className="my-4">
          <Col md="2">
            <div className="movie-poster-wrapper">
              <img src={`https://image.tmdb.org/t/p/w300/${contents.poster_path}`} alt="Movie Poster" className="movie-poster" />
            </div>
          </Col>
          <Col md="10">
            <div className='movie-basic p-1 mb-0'>
              <div className='movie-basic-title'>{contents.title}</div>
              <div className='border-bottom my-1'>
                <span>{contents.release_date} ・ {' '}{contents.genreDTO ? contents.genreDTO.map((genre) => genre.name).join('/') : null} ・ {contents.country}</span>
              </div>
              <div className='border-bottom mt-1'>
                <p>평균 ★ {(contents.tmdb_vote_sum / 2).toFixed(2)}</p>
              </div>
              <div className='header-button d-flex justify-content'>
                <MovieRating memberReview={memberReview} fetchComments={fetchComments} handleAuthShow={handleAuthShow}/>
                <MemberWish handleAuthShow={handleAuthShow} fetchComments={fetchComments}/>
                <div className='dropdown' style={{cursor:'pointer'}}>
                  <div className="mt-1 ml-1 dropdown-toggle" onClick={handleCommentClick} >
                    <FontAwesomeIcon icon={faComment} className="mr-2" />
                    코멘트쓰기
                  </div>
                </div>
                <MemberFavorite handleAuthShow={handleAuthShow} fetchComments={fetchComments}/>
                <CommentDropdown isDropdownVisible={isDropdownVisible} setIsDropdownVisible={setIsDropdownVisible} handleShow={handleShow} onDelete={handleDelete}/>
              </div>
            </div>
          </Col>
        </Row>
        {memberReview.content ? <MemberReviewInfo handleShow={handleShow} handleDelete={handleDelete}/> : ''}
        <CommentModal isOpen={show} onRequestClose={handleClose} movie={contents} fetchComments={fetchComments} comment={comment} isSpoiler={isSpoiler} isEditMode={isEditMode} setComment={setComment} setIsSpoiler={setIsSpoiler}/>
        <DeleteModal isOpen={showDeleteModal} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      </Container>
    </>
  )
}

export default ContentsHeader;

import { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MovieActions } from 'reduxs/Actions/MovieAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import MovieRating from './MovieRating';
import CommentDropdown from './CommentDropdown';
import CommentModal from 'components/Comment/CommentModal';
import DeleteModal from './DeleteModal';

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
  const [comment, setComment] = useState(() => memberReview ? memberReview.content : '');
  const [isSpoiler, setIsSpoiler] = useState(1);
  const [isEditMode, setIsEditMode] = useState(() => memberReview && Object.keys(memberReview).length > 0 ? true : false);

  // 코멘트작성 버튼 > 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 코멘트작성 버튼 > 수정/삭제 드롭다운 메뉴
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // 삭제 모달
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCancelDelete = () => setShowDeleteModal(false);
  const handleConfirmDelete = () => {
    dispatch(MovieActions.deleteComment(memberReview.movie_id, memberReview.member_id));
    setShowDeleteModal(false);
    fetchComments();
  }
  
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  // 코멘트 작성 버튼
  const handleCommentClick = () => {
    dispatch(MovieActions.getReviewByMemberId(contents.movie_id, member_id));

    if (hasComment) {
      setIsEditMode(true);
      setComment(memberReview.content);
      setIsSpoiler(memberReview.state);
    } else {
      setIsEditMode(false);
    }

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

  // 보고싶어요 버튼
  const handleWishClick = () => {
    if (localStorage.getItem('member_id')) {
      
    } else {
      handleAuthShow();
    }
  }

  return (
    <>
      <div className="banner-container">
        <BannerOverlay imageUrl={`https://image.tmdb.org/t/p/original/${contents.backdrop_path}`}></BannerOverlay>
        <img src={`https://image.tmdb.org/t/p/original/${contents.backdrop_path}`} alt="Main centered image" className="banner-image" />
      </div>
      <Container>
        <Row className="my-4">
          <Col md="2">
            <div className="movie-poster-wrapper">
              <img src={`https://image.tmdb.org/t/p/original/${contents.poster_path}`} alt="Movie Poster" className="movie-poster img-fluid" />
            </div>
          </Col>
          <Col md="10">
            <div className='movie-basic p-1 mb-0'>
              <h2>{contents.title}</h2>
              <div className='border-bottom my-1'>
                <span>{contents.release_date} ・ {' '}{contents.genreDTO ? contents.genreDTO.map((genre) => genre.name).join('/') : null} ・ {contents.country}</span>
              </div>
              <div className='border-bottom mt-1'>
                <p>평균 ★ {contents.tmdb_vote_sum}</p>
              </div>
              <div className='header-button d-flex justify-content'>
                <MovieRating memberReview={memberReview}/>
                <div className="m-2 mr-3" onClick={handleWishClick}>
                  <FontAwesomeIcon icon={faHeart} className="mr-2" />
                  보고싶어요
                </div>
                <div className='dropdown'>
                  <div className="mt-1 dropdown-toggle" onClick={handleCommentClick} >
                    <FontAwesomeIcon icon={faComment} className="mr-2" />
                    코멘트쓰기
                  </div>
                </div>
                <CommentDropdown isDropdownVisible={isDropdownVisible} setIsDropdownVisible={setIsDropdownVisible} handleShow={handleShow} onDelete={handleDelete}/>
              </div>
            </div>
          </Col>
        </Row>
        <CommentModal isOpen={show} onRequestClose={handleClose} movie={contents} fetchComments={fetchComments} comment={comment} isSpoiler={isSpoiler} isEditMode={isEditMode} setComment={setComment} setIsSpoiler={setIsSpoiler}/>
        <DeleteModal isOpen={showDeleteModal} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      </Container>
    </>
  )
}

export default ContentsHeader;
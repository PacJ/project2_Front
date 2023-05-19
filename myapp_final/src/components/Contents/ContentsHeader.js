import { Col, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import MovieRating from './MovieRating';
import CommentDropdown from './CommentDropdown';
import CommentModal from 'components/Comment/CommentModal';
import DeleteModal from './DeleteModal';
import MemberWish from './MemberWish';
import MemberReviewInfo from './MemberReviewInfo';
import MemberFavorite from './MemberFavorite';
import useComment from './useComment';

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
  const memberReview = useSelector((state) => state.movie.memberReview);
  const member_id = localStorage.getItem('member_id');
  const movie_id = contents.movie_id;

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
  } = useComment(fetchComments, handleAuthShow, movie_id, member_id);

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
              <div className='border-bottom my-1 ml-2'>
                <span>{contents.release_date} ・ {' '}{contents.genreDTO ? contents.genreDTO.map((genre) => genre.name).join('/') : null} ・ {contents.country}</span>
              </div>
              <div className='border-bottom mt-1'>
                <span className='rating mr-1 ml-2'>TMDB ★ {(contents.tmdb_vote_sum / 2).toFixed(2)}</span>
                <span className='rating2'>・ 부귀영화 ★ {contents.vote_sum}</span>
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
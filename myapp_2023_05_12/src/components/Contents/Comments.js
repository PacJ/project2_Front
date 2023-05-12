import { Link } from "react-router-dom";
import { Col, Container, Row } from 'reactstrap';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
import { useDispatch } from "react-redux";
import { MovieActions } from "reduxs/Actions/MovieAction";
import { Dropdown } from "react-bootstrap";
import { Fragment } from "react";

const Comments = ({ contents, handleAuthShow, memberLikes, fetchComments }) => {
  const member_id = localStorage.getItem('member_id');
  const movie_id = contents.movie_id;
  const dispatch = useDispatch();

  // 데이터 초기화 (작성된 코멘트, 좋아요)
  const comments = Array.isArray(contents.reviewDTO) ? contents.reviewDTO : [];
  const [likedComments, setLikedComments] = useState([]);

  // 경고창 관리
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAlreadyModal, setShowAlreadyModal] = useState(false);

  const handleAlertClose = () => {
    setShowAlertModal(false);
  };

  const handleConfirmClose = () => {
    setShowConfirmModal(false);
  }

  const handleAlreadyClose = () => {
    setShowAlreadyModal(false);
  }

  // 현재 로그인한 사용자가 좋아요를 누른 코멘트 표시
  const isCommentLiked = (comment_member_id) => {
    return likedComments.some(
      (likedComments) => likedComments.comment_member_id === comment_member_id
    );
  };
  
  const handleLikesClick = (comment_member_id) => {
    if (member_id) {
      // 본인이 작성한 코멘트면 경고창
      if (comment_member_id == member_id) {
        setShowAlertModal(true);
      } else {

        const likesDTO = {
          movie_id: movie_id,
          member_id: member_id,
          comment_member_id: comment_member_id,
        };

        if (isCommentLiked(comment_member_id)) {
          // 이미 좋아요 상태인 경우, 좋아요 취소 처리
          dispatch(MovieActions.deleteLikes(likesDTO));
        } else {
          // 좋아요 상태가 아닌 경우, 좋아요 처리
          dispatch(MovieActions.postLikes(likesDTO));
        }
      }
    } else {
      handleAuthShow();
    }
    fetchComments();
  }

  // 스포일러 신고
  const handleSpoilerReport = async (comment_member_id) => {
    const reviewInfoDTO = {
      movie_id: movie_id,
      member_id: comment_member_id,
    }

    const response = await dispatch(MovieActions.getCheckReported(movie_id, comment_member_id));

    if(response.isReported) {
      setShowAlreadyModal(true);
    } else {
      dispatch(MovieActions.commentSpoiler(reviewInfoDTO));
      setShowConfirmModal(true);
    }
  }

  // 욕설 신고
  const handleProfanityReport = async (comment_member_id) => {
    const reviewInfoDTO = {
      movie_id: movie_id,
      member_id: comment_member_id,
    }

    const response = await dispatch(MovieActions.getCheckReported(movie_id, comment_member_id));

    if(response && response.isReported) {
      setShowAlreadyModal(true);
    } else {
      dispatch(MovieActions.commentProfanity(reviewInfoDTO));
      setShowConfirmModal(true);
    }
  }

  useEffect(() => {
    setLikedComments(memberLikes);
    console.log(memberLikes);
  }, [memberLikes]);

  const renderWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ));
  };

  return (
    <>
      <Container>
        <Row className="my-5">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h3>코멘트</h3>
              <Link to="/comment" style={{paddingRight:'20px'}}>More</Link>
            </div>
              {comments && comments.length > 0 ? (comments
                .filter((comment) => comment.content && comment.content.trim() !== '')
                .map((comment) => (
                <div key={comment.member_id} className="comment-box bg-light p-3 mb-3">
                  <div className="d-flex align-items-center">
                    <img src={`/profiles/${comment.profile_path}`} className="profile-pic rounded-circle mx-3"/>
                    <div className="ml-1">
                      <div className="mt-1" style={{color:'gray', fontSize:'1.1em'}}>{comment.nickname}</div>
                      <div style={{color:'#e75757', fontSize:'0.9em'}}>★ {comment.rating !== 0 ? comment.rating : '평가없음'}</div>
                    </div>
                    {comment.member_id != member_id && (
                      <div className="ml-auto mr-2">
                      <Dropdown>
                        <Dropdown.Toggle size="sm" style={{outline: 'none', boxShadow: 'none'}}>
                          신고하기
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => {handleSpoilerReport(comment.member_id)}}>스포일러 신고</Dropdown.Item>
                          <Dropdown.Item onClick={() => {handleProfanityReport(comment.member_id)}}>욕설 신고</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    )}
                  </div>
                  <p className="text-justify ml-3 mt-4 mb-4">{renderWithLineBreaks(comment.content)}</p>
                  <div className="d-flex justify-content-between">
                    <span>
                      <FontAwesomeIcon icon={faThumbsUp} className="mr-1 ml-3" style={isCommentLiked(comment.member_id) ? { color: '#fc8080', cursor: 'pointer' } : { cursor: 'pointer' }} onClick={() => handleLikesClick(comment.member_id)} />
                      <span className="pt-2 pl-1" style={isCommentLiked(comment.member_id) ? { color: '#fc8080' } : {}}>{comment.likes}</span>
                    </span>
                  </div>
                </div>
              ))) : (<p className="d-flex justify-content-center py-5">작성된 코멘트가 없습니다.</p>)}
          </Col>
        </Row>
      </Container>
      {showAlertModal && (
        <Modal
          isOpen={showAlertModal}
          onRequestClose={handleAlertClose}
          contentLabel="경고창"
          className="AlertModal"
          overlayClassName="AlertOverlay"
        >
          <div>본인이 작성한 코멘트는 추천할 수 없습니다.</div>
        </Modal>
      )}
      {showConfirmModal && (
        <Modal
        isOpen={showConfirmModal}
        onRequestClose={handleConfirmClose}
        contentLabel="경고창"
        className="AlertModal"
        overlayClassName="AlertOverlay"
      >
        <div>신고가 완료되었습니다.</div>
      </Modal>
      )}
      {showAlreadyModal && (
        <Modal
        isOpen={showAlreadyModal}
        onRequestClose={handleAlreadyClose}
        contentLabel="경고창"
        className="AlertModal"
        overlayClassName="AlertOverlay"
      >
        <div className="text-center">이미 신고 완료된 코멘트입니다.</div>
        <div className="text-center mt-2">관리자의 승인을 기다려주세요.</div>
      </Modal>
      )}
    </>
  )
}

export default Comments;
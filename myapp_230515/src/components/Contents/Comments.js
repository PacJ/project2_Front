import { Link } from "react-router-dom";
import { Col, Container, Row } from 'reactstrap';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
import { useDispatch } from "react-redux";
import { MovieActions } from "reduxs/Actions/MovieAction";
import { Dropdown } from "react-bootstrap";
import { Fragment } from "react";
import CommentItem from "components/Comment/CommentItem";

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
  
  // 코멘트 좋아요 처리
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

  // 코멘트 스포일러 신고
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

  // 코멘트 욕설 신고
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

  // 코멘트 내용 엔터 처리
  const renderWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ));
  };

  // 코멘트 한개의 더보기 처리
  const [expandedComments, setExpandedComments] = useState([]);

  const toggleExpanded = (member_id) => {
    if (expandedComments.includes(member_id)) {
      setExpandedComments(expandedComments.filter(id => id !== member_id));
    } else {
      setExpandedComments([...expandedComments, member_id]);
    }
  };

  useEffect(() => {
    setLikedComments(memberLikes);
    console.log(memberLikes);
  }, [memberLikes]);

  return (
    <>
      <Container>
        <Row className="my-5">
          <Col>
            <div className="d-flex justify-content align-items-center">
              <h3>코멘트</h3>
            </div>
              <CommentItem comments={comments} handleSpoilerReport={handleSpoilerReport} handleProfanityReport={handleProfanityReport} toggleExpanded={toggleExpanded} isCommentLiked={isCommentLiked} handleLikesClick={handleLikesClick} expandedComments={expandedComments} member_id={member_id}/>
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
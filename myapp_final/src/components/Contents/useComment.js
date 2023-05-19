import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MovieActions } from "reduxs/Actions/MovieAction";

const useComment = (fetchComments = () => {}, handleAuthShow = () => {}, handleDetailClose = () => {}, movie_id, member_id) => {
  const dispatch = useDispatch();
  const memberReview = useSelector((state) => state.movie.memberReview);
  const hasComment = memberReview && memberReview.content;

  const [comment, setComment] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [show, setShow] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if(movie_id && member_id) {
      dispatch(MovieActions.getReviewByMemberId(movie_id, member_id));
    }
  }, [movie_id, member_id, dispatch]);

  // 코멘트 작성 모달 (new)
  const handleShow = useCallback((editMode = false) => {
    setIsEditMode(editMode);
    if (editMode) {
      setComment(memberReview.content);
      setIsSpoiler(memberReview.state);
    }
    setShow(true);
  }, [memberReview]);

  const handleClose = useCallback(() => {
    setShow(false);
    setComment('');
    if(handleDetailClose) { 
      handleDetailClose();
    }
  }, []);

  // 삭제 확인 모달
  const handleDelete = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    dispatch(MovieActions.deleteComment(memberReview.movie_id, memberReview.member_id));
    setShowDeleteModal(false);
    setComment('');
    fetchComments();
  }, [dispatch, memberReview, fetchComments]);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false);
  }, []);

  const handleCommentClick = useCallback(() => {
    if (!member_id) {
      handleAuthShow();
    } else if (hasComment) {
      setIsDropdownVisible(!isDropdownVisible);
    } else {
      handleShow();
    }
  }, [member_id, hasComment, setIsDropdownVisible, handleShow, handleAuthShow]);

  return (
    {
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
    }
  )
}

export default useComment;
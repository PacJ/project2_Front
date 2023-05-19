import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MovieActions } from "reduxs/Actions/MovieAction";
import NoFavoriteModal from "./NoFavoriteModal";
import ChangeFavoriteModal from "./ChangeFavoriteModal";
import CancelFavoriteModal from "./CancelFavoriteModal";
import '../../assets/css/modal.css';

const MemberFavorite = ({ handleAuthShow, fetchComments }) => {
  const dispatch = useDispatch();
  const { movie_id } = useParams();
  const member_id = localStorage.getItem('member_id');
  const memberFavorite = useSelector((state) => state.movie.memberFavorite) || {movie_id: 0};

  // 현재 인생영화 있는지 없는지 관리
  const [value, setValue] = useState(false);

  // 모달창 관리
  const [showNoFavoriteModal, setShowNoFavoriteModal] = useState(false);
  const [showChangeFavoriteModal, setShowChangeFavoriteModal] = useState(false);
  const [showCancelFavoriteModal, setShowCancelFavoriteModal] = useState(false);

  const handleFavoriteChange = async () => {
    // 로그아웃 상태일 때
    if (!member_id) {
      handleAuthShow();
      return;
    }

    if (value) {
      // memberFavorite이 movie_id랑 같을떄, 이미 선택된 상태면 이 인생영화를 취소하시겠어요? 예 누르면 0으로 update, 아니오 누르면 걍 유지
      setShowCancelFavoriteModal(true);
    } else if (memberFavorite.movie_id == 0) {
      // memberFavorite이 0일 때, 아직 없네요 이 영화로 하시겠어요?
      setShowNoFavoriteModal(true);
      console.log("아니 0인데 왜 안떠");
    } else {
      // memberFavorite이 movie_id랑 다를때, 현재 인생영화는 이건데, 지금 영화로 바꾸시겠어요?
      setShowChangeFavoriteModal(true);
    }
  
  }

  const handleNoFavoriteClose = async (confirmed) => {
    setShowNoFavoriteModal(false);
    if (confirmed) {
      dispatch(MovieActions.postFavorite(movie_id, member_id));
      setValue(true);
      fetchComments();
    }
  }

  const handleChangeFavoriteClose = async (confirmed) => {
    setShowChangeFavoriteModal(false);
    if (confirmed) {
      dispatch(MovieActions.postFavorite(movie_id, member_id));
      setValue(true);
      fetchComments();
    }
  }

  const handleCancelFavoriteClose = async (confirmed) => {
    setShowCancelFavoriteModal(false);
    if (confirmed) {
      dispatch(MovieActions.deleteFavorite(member_id));
      setValue(false);
      fetchComments();
    }
  }

  useEffect(() => {
    if (memberFavorite.movie_id == movie_id) {
      setValue(true);
    }
    console.log(movie_id);
    console.log(memberFavorite.movie_id);
  }, [memberFavorite]);

  return (
    <>
      <div className="member-favorite" onClick={handleFavoriteChange}>
        <FontAwesomeIcon icon={faStar} className="mr-2" style={value ? { color: '#b660f8' } : {}}/>
        <span style={value ? { color: '#b660f8' } : {}}>인생영화</span>
      </div>
      <NoFavoriteModal isOpen={showNoFavoriteModal} onRequestClose={handleNoFavoriteClose} onConfirm={handleNoFavoriteClose} onCancel={handleNoFavoriteClose} />
      <ChangeFavoriteModal isOpen={showChangeFavoriteModal} onRequestClose={handleChangeFavoriteClose} onConfirm={handleChangeFavoriteClose} onCancel={handleChangeFavoriteClose} currentFavorite={memberFavorite} />
      <CancelFavoriteModal isOpen={showCancelFavoriteModal} onRequestClose={handleCancelFavoriteClose} onConfirm={handleCancelFavoriteClose} onCancel={handleCancelFavoriteClose}/>
    </>
  )
}

export default MemberFavorite;
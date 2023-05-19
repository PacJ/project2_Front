import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MovieActions } from "reduxs/Actions/MovieAction";

const MemberWish = ({ handleAuthShow, fetchComments }) => {
  const dispatch = useDispatch();
  const { movie_id } = useParams();
  const member_id = localStorage.getItem('member_id');
  const memberWish = useSelector((state) => state.movie.memberWish);

  const [value, setValue] = useState(false);

  const handleWishChange = async () => {
    const wishDTO = {
      movie_id: movie_id,
      member_id: member_id,
    }

    console.log("클릭클릭");
    // 로그아웃 상태일 때
    if (!member_id) {
      handleAuthShow();
      return;
    }

    if (value) {
      await dispatch(MovieActions.deleteWish(movie_id, member_id));
    } else {
      await dispatch(MovieActions.postWish(wishDTO));
    }

    setValue(!value);
    fetchComments();
  }

  useEffect(() => {
    if (memberWish && memberWish.member_id) {
      setValue(true);
      console.log(memberWish.member_id);
    }
  }, [memberWish]);

  return (
    <div className="member-wish">
      <input
        className="form-check-input"
        type="checkbox"
        id="wishCheck"
        checked={value}
        onChange={handleWishChange}
        style={{ display: 'none' }}
      />
      <label className="member-wish-label" htmlFor="wishCheck">
        <FontAwesomeIcon icon={faHeart} className="mr-2" style={value ? { color: '#fc8080' } : {}}/>
        <span style={value ? { color: '#fc8080' } : {}}>보고싶어요</span>
      </label>
  </div>
  )
}

export default MemberWish;
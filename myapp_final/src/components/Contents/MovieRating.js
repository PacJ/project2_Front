import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MovieActions } from "reduxs/Actions/MovieAction";

const MovieRating = ({ memberReview, fetchComments, handleAuthShow }) => {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  const dispatch = useDispatch();
  const { movie_id } = useParams();
  const member_id = localStorage.getItem('member_id');

  const customStarSize = {
    fontSize: '45px',
  };

  const handleRatingChange = async (newValue) => {
    console.log("선택된거", newValue);
    console.log("원래", memberReview.rating);

    const ratingDTO = {
      movie_id: movie_id,
      member_id: member_id,
      rating: newValue,
    };

    // 로그아웃 상태일 때
    if (!member_id) {
      handleAuthShow();
      setValue(0);
    } else {
      if (newValue === null || memberReview.rating > 0 && memberReview.rating === newValue) {
        // 현재 작성된 평점과 저장된 평점이 같을 때
        await dispatch(MovieActions.deleteRating(movie_id, member_id));
        setValue(0);
      } else if (memberReview.rating > 0) {
        // 이미 작성된 평점이 있을 때
        await dispatch(MovieActions.updateRating(ratingDTO));
      } else {
        // memberReview에 없을 때
        await dispatch(MovieActions.postRating(ratingDTO));
      }
    }
    fetchComments();
  }

  useEffect(() => {
    if (memberReview && memberReview.rating) {
      setValue(memberReview.rating);
    }
    //console.log(memberReview.rating);
  }, [memberReview]);

  return (
    <Box
      sx={{
        width: 250,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Tooltip title={hover === value ? '취소하기' : ''} arrow>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(newValue);
          handleRatingChange(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ ...customStarSize, opacity: 0.55 }} fontSize="inherit" />}
        icon={<StarIcon style={customStarSize} fontSize="inherit" />}
      />
      </Tooltip>
    </Box>
  )
}

export default MovieRating;
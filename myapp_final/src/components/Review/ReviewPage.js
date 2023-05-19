import style from '../../assets/css/review.module.css';
import { Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import '../../assets/css/modal.css';
import yourImage from '../../assets/img/180c6e128821941b1.jpg';
import axios from 'axios';
import ReviewModal from './MovieDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileAction } from 'reduxs/Actions/ProfileAction';
import Tooltip from '@mui/material/Tooltip';
import { MovieActions } from 'reduxs/Actions/MovieAction';
import { baseUrl } from 'Apiurl';
import { MovieReducers } from 'reduxs/Reducers/MovieReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ReviewPage = () => {
  const dispatch = useDispatch();
  const member_id = localStorage.getItem("member_id");
  const memberInfo = useSelector((state) => state.profile.memberInfo);

  const [selectedOption, setSelectedOption] = useState('랜덤영화');
  const [prevSelectedOption, setPrevSelectedOption] = useState('');
  const [movies, setMovies] = useState([]);
  const [detailShow, setDetailShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // 별점 관련
  const customStarSize = {
    fontSize: '30px',
  };

  const [userRatings, setUserRatings] = useState({});
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  const handleRatingChange = async (newValue, movie_id) => {
    console.log("선택된거", newValue);

    const ratingDTO = {
      movie_id: movie_id,
      member_id: member_id,
      rating: newValue,
    };

    if (newValue === null || userRatings[movie_id]?.rating > 0 && userRatings[movie_id]?.rating === newValue) {
      // 현재 작성된 평점과 저장된 평점이 같을 때
      await dispatch(MovieActions.deleteRating(movie_id, member_id));
      setUserRatings(prev => ({ ...prev, [movie_id]: null }));
      setValue(0);
    } else if (userRatings[movie_id]?.rating > 0) {
      // 이미 작성된 평점이 있을 때
      await dispatch(MovieActions.updateRating(ratingDTO));
      setUserRatings(prev => ({ ...prev, [movie_id]: ratingDTO }));
    } else {
      // userRatings에 없을 때
      await dispatch(MovieActions.postRating(ratingDTO));
      setUserRatings(prev => ({ ...prev, [movie_id]: ratingDTO }));
    }
  }

  // 보고싶어요
  const [messages, setMessages] = useState({});
  const [wishChecked, setWishChecked] = useState({});

  // 자세히 보기
  const handleDetailClose = (message, movie_id) => {
    setDetailShow(false);
    setSelectedMovie(null);
    setMessages(prev => ({
      ...prev,
      [movie_id]: message
    }));
  };

  const handleDetailShow = (movie) => {
    setSelectedMovie(movie);
    setDetailShow(true);
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Authorization'),
    },
  };

  // 장르별 리스트 불러오기
  const handleOptionClick = (eventKey) => {
    setSelectedOption(eventKey);
    axios
      .post('http://localhost:8090/printmovie', eventKey, config)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // 영화 리스트 불러오기
    axios
      .get('http://localhost:8090/printrandom')
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // 사용자 프로필 정보 불러오기
    dispatch(ProfileAction.getProfileList(member_id));
    
    // 사용자 rating 정보 불러오기
    axios.get(`${baseUrl}/getRatingAndWish/${member_id}`)
      .then((response) => {
        const ratingsByMovieId = response.data.rating.reduce((acc, rating) => {
          acc[rating.movie_id] = rating;
          return acc;
        }, {});
        setUserRatings(ratingsByMovieId);
        const wishByMovieId = response.data.wish.reduce((acc, wish) => {
          acc[wish.movie_id] = wish;
          return acc;
        }, {});
        setWishChecked(wishByMovieId);
      });
  }, [member_id]);

  // 리모콘 누를때마다 렌더링
  useEffect(() => {
    setPrevSelectedOption(selectedOption);
  }, [selectedOption, value]);

  return (
    <>
      <div
        className='d-flex flex-column min-vh-100'
        style={{ backgroundColor: '#efefef' }}
      >
        <div style={{ height: '188px', width: '100%' }}></div>{' '}
        <div className={style.wrap}>
          <div className={style.screen}>
            <div className={style.maintitle}>
              <div>
                <p>
                  현재까지　
                  <span
                    style={{
                      fontWeight: 'bold',
                      fontSize: '15pt',
                      color: '#e75757',
                    }}
                  >
                    총 {memberInfo && memberInfo.member_id ? (<span>{memberInfo.rating_count}</span>) : ''}개
                  </span>
                  　평가를 완료했습니다.
                </p>
              </div>
              <p>
                작품을 평가해보세요. 당신의 취향에 딱 맞는 작품을
                추천해드릴게요.
              </p>
            </div>

            {movies.map((movie) => (
              <div key={movie.movie_id} className={style.item}>
                <div className={style.left}>
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    />
                  ) : (
                    <img src={yourImage} alt='movie' />
                  )}
                </div>

                <div className={style.right}>
                  <div style={{ position: 'absolute', top: '20px' }}>
                    <p className={style.text1}>{movie.title}</p>
                    <p className={style.text2} style={messages[movie.movie_id] ? {color: '#fc8080'} : {}}>
                      {messages[movie.movie_id]
                        ? <>
                            <FontAwesomeIcon icon={faHeart} className='mr-1'/>
                            {messages[movie.movie_id]}
                          </>
                        : `${movie.release_date} ・ ${movie.country}`
                      }
                    </p>
                    <Box
                      sx={{
                        marginTop: '5px',
                        marginLeft: '-5px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Tooltip title={hover === value ? '취소하기' : ''} arrow>
                      <Rating
                        name='hover-feedback'
                        value={userRatings[movie.movie_id]?.rating || 0}
                        precision={0.5}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                          console.log(newValue);
                          handleRatingChange(newValue, movie.movie_id);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                        emptyIcon={
                          <StarIcon
                            style={{
                              ...customStarSize,
                              width: '30px',
                              opacity: 0.55,
                            }}
                            fontSize='inherit'
                          />
                        }
                        icon={
                          <StarIcon style={customStarSize} fontSize='inherit' />
                        }
                      />
                      </Tooltip>
                    </Box>
                  </div>
                  <Button
                    style={{
                      position: 'absolute',
                      width: '100px',
                      height: '25px',
                      padding: '5px',
                      bottom: '10px',
                      right: '0px',
                    }}
                    color='secondary'
                    onClick={() => handleDetailShow(movie)}
                  >
                    <p
                      style={{
                        padding: '0',
                        fontSize: '10pt',
                        margin: 0,
                        lineHeight: '10px',
                      }}
                    >
                      자세히 보기
                    </p>
                  </Button>
                  <ReviewModal
                    detailShow={detailShow}
                    handleDetailClose={handleDetailClose}
                    movie={selectedMovie}
                    wishChecked={wishChecked}
                    setWishChecked={setWishChecked}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={style.wrap2}>
          <div className={style.screen2}>
            <div className={style.button}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div className='row'>
                  <div className='col'>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === '랜덤영화' ? style.selected : ''
                      }`}
                      onClick={() => handleOptionClick('랜덤영화')}
                    >
                      랜덤영화
                    </button>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === '드라마' ? style.selected : ''
                      }`}
                      onClick={() => handleOptionClick('드라마')}
                    >
                      드라마
                    </button>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === '코미디' ? style.selected : ''
                      }`}
                      onClick={() => handleOptionClick('코미디')}
                    >
                      코미디
                    </button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === '범죄' ? style.selected : ''
                      }`}
                      onClick={() => handleOptionClick('범죄')}
                    >
                      범죄
                    </button>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === '로맨스' ? style.selected : ''
                      }`}
                      onClick={() => handleOptionClick('로맨스')}
                    >
                      로맨스
                    </button>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === '액션' ? style.selected : ''
                      }`}
                      onClick={() => handleOptionClick('액션')}
                    >
                      액션
                    </button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === '스릴러' ? style.selected : ''
                      }`}
                      onClick={() => handleOptionClick('스릴러')}
                    >
                      스릴러
                    </button>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === '다큐멘터리'
                          ? style.selected
                          : ''
                      }`}
                      onClick={() => handleOptionClick('다큐멘터리')}
                    >
                      다큐멘터리
                    </button>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === '모험' ? style.selected : ''
                      }`}
                      onClick={() => handleOptionClick('모험')}
                    >
                      모험
                    </button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === 'SF' ? style.selected : ''
                      }`}
                      onClick={() => handleOptionClick('SF')}
                    >
                      SF
                    </button>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === '애니메이션'
                          ? style.selected
                          : ''
                      }`}
                      onClick={() => handleOptionClick('애니메이션')}
                    >
                      애니메이션
                    </button>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === '가족' ? style.selected : ''
                      }`}
                      onClick={() => handleOptionClick('가족')}
                    >
                      가족
                    </button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === '미스터리' ? style.selected : ''
                      }`}
                      onClick={() => handleOptionClick('미스터리')}
                    >
                      미스터리
                    </button>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === '공포' ? style.selected : ''
                      }`}
                      onClick={() => handleOptionClick('공포')}
                    >
                      공포
                    </button>
                    <button
                      className={`${style.genrebutton} ${
                        prevSelectedOption === '판타지' ? style.selected : ''
                      }`}
                      onClick={() => handleOptionClick('판타지')}
                    >
                      판타지
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;

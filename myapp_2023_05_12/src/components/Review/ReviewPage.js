import style from '../../assets/css/review.module.css';
import { Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'reactstrap';
import '../../assets/css/modal.css';
import yourImage from '../../assets/img/180c6e128821941b1.jpg';
import axios from 'axios';
import ReviewModal from './MovieDetailModal';

const ReviewPage = () => {
  const customStarSize = {
    fontSize: '30px',
  };

  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('Authorization'),
    },
  };

  const [selectedOption, setSelectedOption] = useState('랜덤영화');
  const [prevSelectedOption, setPrevSelectedOption] = useState('');
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedMovie(null);
  };

  const handleShow = (movie) => {
    setSelectedMovie(movie);
    setShow(true);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8090/printrandom')
      .then((response) => {
        console.log('review');
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //상태 변할때마다 effect 발생
  useEffect(() => {
    setPrevSelectedOption(selectedOption);
  }, [selectedOption]);

  const handleOptionClick = (eventKey) => {
    console.log(eventKey);

    setSelectedOption(eventKey);

    axios
      .post('http://localhost:8090/printmovie', eventKey, config)
      .then((response) => {
        // 영화 목록을 받아와서 처리하는 코드 작성
        console.log('printmovie');
        console.log(response.data);
        setMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(movies);

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
              <p>
                현재까지　
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '15pt',
                    color: '#e75757',
                  }}
                >
                  총 250개
                </span>
                　평가를 완료했습니다.
              </p>
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
                    <p className={style.text2}>
                      {movie.release_date} ・ {movie.country}
                    </p>
                    <Box
                      sx={{
                        marginTop: '5px',
                        marginLeft: '-5px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Rating
                        name='hover-feedback'
                        value={value}
                        precision={0.5}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                          console.log(newValue);
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
                    onClick={() => handleShow(movie)}
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
                    show={show}
                    handleClose={handleClose}
                    movie={selectedMovie}
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

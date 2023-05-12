import 'assets/css/font.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProfileAction } from 'reduxs/Actions/ProfileAction';
import style from '../../assets/css/profile.module.css';

const ProfileListMore = () => {
  const dispatch = useDispatch();
  const member_id = localStorage.getItem('member_id');
  const wishList = useSelector((state) => state.profile.wishList);
  const ratingList = useSelector((state) => state.profile.ratingList);
  const [movies, setMovies] = useState([]);
  const { path } = useParams();

  useEffect(() => {
    dispatch(ProfileAction.getProfileList(member_id));
  }, []);

  //movies에 path 값에 따라 다른 List를 담아준다.
  useEffect(() => {
    if (path === 'wish') {
      setMovies(wishList);
      console.log('wish');
    } else if (path === 'rating') {
      setMovies(ratingList);
      console.log('rating');
    }
  }, [path, wishList, ratingList]);

  console.log(movies);

  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        <div style={{ width: '100%', height: '150px' }}></div>
        <div style={{ width: '100%' }}>
          <div style={{ width: '1100px', margin: 'auto' }}>
            {path === 'wish' ? (
              <p className={style.list_title}>보고싶어요 전체보기</p>
            ) : (
              <p className={style.list_title}>평가를 완료한 영화 전체보기</p>
            )}

            {movies &&
              movies.map((movie) => {
                return (
                  <>
                    <div
                      className='slide_movie'
                      key={movie.movie_id}
                      style={{
                        height: 'auto',
                        width: '125px',
                        float: 'left',
                        marginLeft: '11px',
                      }}
                    >
                      <div
                        style={{
                          marginBottom: '10px',
                        }}
                      >
                        <a href={`/contents/${movie.movie_id}`}>
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            style={{
                              borderRadius: 3,
                              width: '125px',
                              height: '185px',
                            }}
                          />
                        </a>
                      </div>
                      {/* 영화 타이틀 */}
                      <div
                        className='titlebox'
                        style={{
                          overflow: 'hidden',
                          wordBreak: 'breakall',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          width: '125px',
                        }}
                      >
                        <div className='movie_title'>
                          <p
                            style={{
                              overflow: 'hidden',
                              wordBreak: 'breakall',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis',
                              fontWeight: 'bold',
                              fontSize: '10pt',
                              fontFamily: 'NanumSquare',
                            }}
                          >
                            {movie.title}
                          </p>
                        </div>

                        <div
                          className='movie_date'
                          style={{
                            fontSize: '14px',
                            fontFamily: 'NanumSquare',
                          }}
                        >
                          {movie.release_date}
                        </div>
                        <div
                          className='movie_rating'
                          style={{
                            fontSize: '15px',
                            color: '#fc8080',
                            fontFamily: 'NanumSquare',
                            marginBottom: '20px',
                          }}
                        >
                          ★ {movie.tmdb_vote_sum}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileListMore;

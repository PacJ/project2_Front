import style from '../../assets/css/profile.module.css';

const ProfileList = ({ movies = [] }) => {

  return (
    <>
      <div className={style.img_set}>
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
    </>
  );
};

export default ProfileList;

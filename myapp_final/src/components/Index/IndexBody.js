import { useDispatch, useSelector } from 'react-redux';
import MovieList from './MovieList';
import { useEffect, useState } from 'react';
import { MovieActions } from 'reduxs/Actions/MovieAction';
import Recommend from 'components/Recommend/Recommend';
import { baseUrl } from 'Apiurl';
import axios from 'axios';

function IndexBody() {
  // 리스트 선언 모음
  const dispatch = useDispatch();

  const topRatedList = useSelector((state) => state.movie.topRatedList);
  const topRated = useSelector((state) => state.movie.topRated);
  const latestMovies = useSelector((state) => state.movie.latestMovies);
  const themeMovies = useSelector((state) => state.movie.themeMovies);
  const topRatedDirector = useSelector((state) => state.movie.topRatedDirector);
  const topRatedActor = useSelector((state) => state.movie.topRatedActor);

  // const favoriteGenre = useSelector((state) => state.movie.favoriteGenre);
  // const favoriteDirector = useSelector((state) => state.movie.favoriteDirector);
  // const favoriteActor = useSelector((state) => state.movie.favoriteActor);

  const member_id = localStorage.getItem("member_id");
  const nickname = localStorage.getItem("nickname");
  
  const [favoriteGenre, setFavoriteGenre] = useState([]);
  const [favoriteDirector, setFavoriteDirector] = useState([]);
  const [favoriteActor, setFavoriteActor] = useState([]);
  const [directorName, setDirectorName] = useState('');
  const [actorName, setActorName] = useState('');
  
  const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
    },
  };

  useEffect(() => {
    dispatch(MovieActions.getMovieList());

    if(localStorage.getItem("isLogin")) {
      axios.get(`${baseUrl}/favoriteGenre/${member_id}`, config)
        .then((res) => {
          setFavoriteGenre(res.data.favoriteGenre);
          setFavoriteDirector(res.data.favoriteDirector);
          setFavoriteActor(res.data.favoriteActor);
          setDirectorName(res.data.favoriteDirector[0].director_name);
          setActorName(res.data.favoriteActor[0].actor_name);
        })
        .catch(err => {
          console.log(err);
      });
    }  
  }, []);

  return (
    <>
      <div style={{ marginLeft: '5%', marginRight: '5%' }}>
        <MovieList listTitle="부귀영화 TOP 20" movies={topRated} />
        <MovieList listTitle="해외 평가 순위" movies={topRatedList} />
        <MovieList listTitle="최근 개봉 영화" movies={latestMovies} />
        {member_id ? (
          <>
            <MovieList listTitle={`${nickname} 님의 선호 장르 리스트`} movies={favoriteGenre} />

            {/* 최초 회원가입시 선호감독, 선호배우 정보가 없기 때문에 가려놓음 */}
            {favoriteDirector && Object.keys(favoriteDirector).length > 0 ? (
              <>
                <MovieList listTitle={`선호 감독 ${directorName}의 영화`} movies={favoriteDirector} />
                <MovieList listTitle={`선호 배우 ${actorName}의 영화`} movies={favoriteActor} />
                <Recommend />
              </>
            ) : ('')}
          </>
        ) : (
          <>
            <MovieList listTitle="가정의 달 추천" movies={themeMovies} />
            <MovieList listTitle="화제의 감독 팀 버튼의 영화" movies={topRatedDirector} />
            <MovieList listTitle="화제의 배우 티모시 샬라메의 영화" movies={topRatedActor} />
          </>
        )}
        
      </div>
    </>
  );
}

export default IndexBody;

import { useDispatch, useSelector } from "react-redux";
import MovieList from "./MovieList";
import { useEffect, useState } from "react";
import { MovieActions } from "reduxs/Actions/MovieAction";
import Recommend from "components/Recommend/Recommend";
import { baseUrl } from "Apiurl";
import axios from "axios";

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
  const [favoriteGenre, setFavoriteGenre] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  useEffect(() => {
    dispatch(MovieActions.getMovieList());

    if (localStorage.getItem("isLogin")) {
      axios
        .get(`${baseUrl}/favoriteGenre/${member_id}`, config)
        .then((res) => {
          setFavoriteGenre(res.data.favoriteGenre);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      <div style={{ marginLeft: "5%", marginRight: "5%" }}>
        <MovieList listTitle="부귀영화 TOP 20" movies={topRated} />
        <MovieList listTitle="TMDB 추천 영화" movies={topRatedList} />
        <MovieList listTitle="최근 개봉 영화" movies={latestMovies} />
        {member_id ? (
          <>
            <MovieList
              listTitle="선호하는 장르 기반 추천"
              movies={favoriteGenre}
            />
          </>
        ) : (
          <>
            <MovieList listTitle="가정의 달 추천" movies={themeMovies} />
            <MovieList
              listTitle="화제의 감독 팀 버튼의 영화"
              movies={topRatedDirector}
            />
            <MovieList
              listTitle="화제의 배우 티모시 샬라메의 영화"
              movies={topRatedActor}
            />
          </>
        )}
        {/* <Recommend /> */}
      </div>
    </>
  );
}

export default IndexBody;

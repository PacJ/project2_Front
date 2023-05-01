import { useDispatch, useSelector } from 'react-redux';
import MovieList from './MovieList';
import { useEffect } from 'react';
import { MovieActions } from 'reduxs/Actions/MovieAction';

function IndexBody() {
  // 리스트 선언 모음
  const dispatch = useDispatch();

  const topRatedList = useSelector((state) => state.movie.topRatedList);
  const topRatedClassic = useSelector((state) => state.movie.topRatedClassic);
  
  useEffect(() => {
    dispatch(MovieActions.getMovieList());
  }, []);

  return (
    <>
      <div style={{ marginLeft: '5%', marginRight: '5%' }}>
        <MovieList listTitle="평점 높은 최신영화 리스트" movies={topRatedList} />
        <MovieList listTitle="평점 높은 고전영화 리스트" movies={topRatedClassic} />
      </div>
    </>
  );
}

export default IndexBody;

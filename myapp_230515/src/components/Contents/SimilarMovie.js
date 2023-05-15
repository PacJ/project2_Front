import { Container } from 'reactstrap';

const SimilarMovie = ({ contents = {}}) => {
  const movies = Array.isArray(contents.listDTO) ? contents.listDTO : [];

  return (
    <>
      <Container>
        <div className="my-5">
          <div md="10">
            <h3 className='mt-6 pt-3'>비슷한 작품</h3>
            <div className='similar-movie-list'>
            {movies && movies.map((movie) => {
              return (
                <div className='similar-movie' key={movie.movie_id}>
                  <div className='img-box'>
                    {/* 새로고침 안하면 memberReview가 따라오는 상황이 발생해서 일단 a링크로 작성함 */}
                    <a href={`/contents/${movie.movie_id}`}>
                      <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} className='img-fluid'/>
                    </a>
                  </div>
                  <div className='similar-movie-info'>
                    <div className='title'>{movie.title}</div>
                    <div className='rating'>★ {(movie.tmdb_vote_sum / 2).toFixed(2)}</div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default SimilarMovie;
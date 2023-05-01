//사용자가 별점 평가를 남길 수 있는 영화 리스트 페이지
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'reactstrap';
import '../../assets/css/moviemodal.css';
import ReviewModal from './MovieDetailModal';
import axios from 'axios';
import yourImage from '../../assets/img/180c6e128821941b1.jpg';

const ReviewPage = () => {
  const [movies, setMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedMovie(null);
  }

  const handleShow = (movie) => {
    setSelectedMovie(movie);
    setShow(true);
  }

  useEffect(() => {
    axios.get('http://localhost:8090/printrandom')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  console.log(movies);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: '150px' }}>
      <div className="container">
        <header className="my-4">
          <div className="row">
            <div className="col mb-3">
              <h2 className="text-center mb-3">1</h2>
              <p className="text-center">작품을 평가해보세요. 당신의 취향에 딱 맞는 작품을 추천해드릴게요.</p>
            </div>
          </div>
          <button className='btn btn-primary'>랜덤 영화</button>
        </header>

        <div className="row">
          <div className="col">
            <ul className='pl-0'>
              <li className="list-group-item">
                {movies.map((movie) => (
                  <div key={movie.movie_id} className="row align-items-center">
                    <div className="col-3">
                      {movie.poster_path
                        ? <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="movie" className="img-fluid" />
                        : <img src={yourImage} alt="movie" className="img-fluid" />
                      }
                    </div>
                    <div className="col-9">
                      <h3 className="mb-0">{movie.title}</h3>
                      <div className='mb-3'>{movie.release_date} ・ {movie.country}</div>
                      <Button color="secondary" onClick={() => handleShow(movie)}>
                        자세히 보기
                      </Button>
                      <ReviewModal show={show} handleClose={handleClose} movie={selectedMovie} />
                    </div>
                  </div>
                ))}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewPage;

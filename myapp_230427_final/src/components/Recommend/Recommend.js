import axios from "axios";
import MovieList from "components/Index/MovieList";
// import PulseLoader from 'react-spinners/er';
import { useEffect, useState } from "react";

const Recommend = () => {
  const [loading, setLoading] = useState(true);
  const member_id = localStorage.getItem("member_id");
  console.log("recommend");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const [movies, setMovies] = useState([]);
  const [movies1, setMovies1] = useState([]);
  const [movies2, setMovies2] = useState([]);

  useEffect(() => {
    axios
      .post(`http://localhost:8090/abc`, member_id, config)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.recommendByGenre);
        setMovies1(response.data.titleSim);
        setMovies2(response.data.userRecommend);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          {/* <PulseLoader color="#e75757" size={40} /> */}
        </div>
      )}
      {!loading && (
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
          <MovieList
            listTitle="최근 평가한 영화와 장르가 비슷한 추천 영화"
            movies={movies}
          />
          <MovieList
            listTitle="최근 평가한 영화와 제목이 비슷한 추천 영화"
            movies={movies1}
          />
          <MovieList
            listTitle="비슷한 평가결과를 가진 사용자들의 추천 영화"
            movies={movies2}
          />
        </div>
      )}
    </>
  );
};

export default Recommend;

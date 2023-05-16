import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

//필요없어짐!!
const RecList = () => {
  // 슬라이드 사용하기 위한 선언 모음
  const imgNumber = 20;
  const imgWidth = 1280; // The width of each image box in pixels

  const [loading, setLoading] = useState(true);

  const [position, setPosition] = useState(0);
  const [recList, setRecList] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handlePrevClick = () => {
    if (position < 0) {
      setPosition(position + imgWidth);
    }
  };

  const handleNextClick = () => {
    const maxPosition = (-(imgNumber - 5) * imgWidth) / 5; // Assuming 5 images are shown at a time
    if (position > maxPosition) {
      setPosition(position - imgWidth);
    }
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };

  const member_id = localStorage.getItem("member_id");
  console.log(member_id);

  const getRecommendations = () => {
    axios
      .get(`http://localhost:8090/recommend/${member_id}`, config)
      .then((response) => {
        console.log("호출됨!");
        console.log(response.data);
        setRecList(response.data);
        setShowRecommendations(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  return (
    <div className="container">
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "100px",
          }}
        >
          {" "}
          <p>로딩중이다 십새야</p>
          <PulseLoader color="#e75757" size={40} />
        </div>
      )}
      {!loading && (
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
          {showRecommendations && recList.length > 0 && (
            <div className="slide">
              <p>{`${localStorage.getItem("name")}님을 위한 추천 영화`}</p>
              <div className="img_set">
                {/* 이미지박스 */}
                {/* left값으로 위치 변경 할 수 있음 */}
                <div
                  className="img_set_set"
                  style={{
                    "--img-set-width": `${imgNumber * imgWidth}px`,
                    "--img-set-position": `${position}px`,
                  }}
                >
                  {recList &&
                    recList.map((movie, index) => (
                      <div
                        className="slide_movie"
                        key={`${movie.movie_id}-${index}`}
                      >
                        <div className="img_box">
                          <Link to={`/contents/${movie.movie_id}`}>
                            {movie.poster_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                alt="영화 포스터"
                              />
                            ) : (
                              <img
                                src="\profile1.jpeg"
                                alt="기본 포스터 이미지"
                              />
                            )}
                            <div className="title_box">
                              <div className="title">{movie.title}</div>
                              <div className="date">
                                {movie.release_date} 개봉
                              </div>
                              <div className="rating">
                                ★ {movie.tmdb_vote_sum}
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <button className="prev_button" onClick={handlePrevClick}>
                <img src={require("assets/img/left.png")}></img>
              </button>
              <button className="next_button" onClick={handleNextClick}>
                <img src={require("assets/img/right.png")}></img>
              </button>
            </div>
          )}
          {showRecommendations == true && recList.length == 0 && (
            <p
              style={{ fontSize: "25px", padding: "10px", fontWeight: "bold" }}
            >
              추천 영화가 없습니다. 평가를 남겨보세요!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecList;

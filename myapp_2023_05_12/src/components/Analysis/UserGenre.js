import { useEffect, useState } from "react";
import style from "../../assets/css/analysis.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "Apiurl";

// 사용자가 남긴 별점 개수, 분표 요약 페이지
const UserGenre = () => {
  const { member_id } = useParams();
  const [preferredGenre, SetPreferredGenre] = useState([]);

  const genreName = [...preferredGenre];
  // console.log("선호장르" + genreName);

  // console.log('gg', preferredGenre);
  // console.log( genreName[0].genre_name : '');
  console.log(preferredGenre && preferredGenre[0]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/analysis/${member_id}`)
      .then((response) => {
        SetPreferredGenre(response.data.preferredGenre);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {genreName.length > 2 ? (
        <div style={{ margin: "10px  auto 0 auto", width: "700px" }}>
          <div className={style.box2}>
            <div className={style.content}>
              <p className={style.title}>선호 장르</p>
              <div className={style.text2}>
                {genreName.length > 2 ? (
                  <div style={{ margin: "auto" }}>
                    <div className={style.textbox}>
                      <div className={style.top}>{genreName[0].genre_name}</div>
                      <div className={style.foot2}>
                        {genreName[0].total}점
                        <span style={{ fontWeight: "bold" }}>・</span>
                        {genreName[0].genreRating_cnt}편
                      </div>
                    </div>
                    <div id={style.middle} className={style.textbox}>
                      <div className={style.top}>{genreName[1].genre_name}</div>
                      <div className={style.foot2}>
                        {genreName[1].total}점
                        <span style={{ fontWeight: "bold" }}>・</span>
                        {genreName.length > 0
                          ? genreName[1].genreRating_cnt
                          : ""}
                        편
                      </div>
                    </div>
                    <div className={style.textbox}>
                      <div className={style.top}>{genreName[2].genre_name}</div>
                      <div className={style.foot2}>
                        {genreName[2].total}점
                        <span style={{ fontWeight: "bold" }}>・</span>
                        {genreName.length > 0
                          ? genreName[2].genreRating_cnt
                          : ""}
                        편
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className={style.ranking}>
                {genreName.length > 3 ? (
                  <div id="rank3" className={style.rank_set}>
                    <div className={style.rank_left}>
                      {genreName[3].genre_name}
                    </div>
                    <div className={style.rank_right}>
                      {genreName[3].total}점
                      <span style={{ fontWeight: "bold" }}>・</span>
                      {genreName[3].genreRating_cnt}편
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {genreName.length > 4 ? (
                  <div id="rank4" className={style.rank_set}>
                    <div className={style.rank_left}>
                      {genreName[4].genre_name}
                    </div>
                    <div className={style.rank_right}>
                      {genreName[4].total}점
                      <span style={{ fontWeight: "bold" }}>・</span>
                      {genreName[4].genreRating_cnt}편
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {genreName.length > 5 ? (
                  <div id="rank5" className={style.rank_set}>
                    <div className={style.rank_left}>
                      {genreName[5].genre_name}
                    </div>
                    <div className={style.rank_right}>
                      {genreName[5].total}점
                      <span style={{ fontWeight: "bold" }}>・</span>
                      {genreName[5].genreRating_cnt}편
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {genreName.length > 6 ? (
                  <div id="rank6" className={style.rank_set}>
                    <div className={style.rank_left}>
                      {genreName[6].genre_name}
                    </div>
                    <div className={style.rank_right}>
                      {genreName[6].total}점
                      <span style={{ fontWeight: "bold" }}>・</span>
                      {genreName[6].genreRating_cnt}편
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {genreName.length > 7 ? (
                  <div id="rank7" className={style.rank_set}>
                    <div className={style.rank_left}>
                      {genreName[7].genre_name}
                    </div>
                    <div className={style.rank_right}>
                      {genreName[7].total}점
                      <span style={{ fontWeight: "bold" }}>・</span>
                      {genreName[7].genreRating_cnt}편
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {genreName.length > 8 ? (
                  <div id="rank8" className={style.rank_set}>
                    <div className={style.rank_left}>
                      {genreName[8].genre_name}
                    </div>
                    <div className={style.rank_right}>
                      {genreName[8].total}점
                      <span style={{ fontWeight: "bold" }}>・</span>
                      {genreName[8].genreRating_cnt}편
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {genreName.length > 9 ? (
                  <div id="rank9" className={style.rank_set}>
                    <div className={style.rank_left}>
                      {genreName[9].genre_name}
                    </div>
                    <div className={style.rank_right}>
                      {genreName[9].total}점
                      <span style={{ fontWeight: "bold" }}>・</span>
                      {genreName[9].genreRating_cnt}편
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserGenre;

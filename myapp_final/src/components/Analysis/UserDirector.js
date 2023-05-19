import { useEffect, useState } from 'react';
import style from '../../assets/css/analysis.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from 'Apiurl';

const UserDirector = () => {
  const { member_id } = useParams();
  const [preferredDirector, SetPreferredDirector] = useState([]);

  const director = [...preferredDirector];
  console.log(director.length > 0 ? director : '');
  useEffect(() => {
    axios
      .get(`${baseUrl}/analysis/${member_id}`)
      .then((response) => {
        SetPreferredDirector(response.data.preferredDirector);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {director.length > 6 ? (
        <div style={{ margin: '10px  auto 0 auto', width: '700px' }}>
          <div className={style.box2}>
            <div className={style.content}>
              <p className={style.title}>선호 감독</p>
              <div className={style.ranking2}>
                <div className={style.rank_left}>
                  <>
                    <div id='rank1' className={style.rankprofile}>
                      <div className={style.rankpro_left}>
                        <img
                          className={style.rank_img}
                          src={`https://image.tmdb.org/t/p/original/${
                            director.length > 0
                              ? director[0].director_image
                              : ''
                          }`}
                        />
                      </div>
                      <div className={style.rankpro_right}>
                        <p className={style.rankpro_name}>
                          {director[0].director_name}
                        </p>
                        <p>
                          {director[0].total}점
                          <span style={{ fontWeight: 'bold' }}>・</span>
                          {director[0].directorRating_cnt}편
                        </p>
                      </div>
                    </div>
                    <div className={style.line}></div>
                  </>

                  <div id='rank2' className={style.rankprofile}>
                    <div className={style.rankpro_left}>
                      <img
                        className={style.rank_img}
                        src={`https://image.tmdb.org/t/p/original/${director[1].director_image}`}
                      />
                    </div>
                    <div className={style.rankpro_right}>
                      <p className={style.rankpro_name}>
                        {director[1].director_name}
                      </p>
                      <p>
                        {director[1].total}점
                        <span style={{ fontWeight: 'bold' }}>・</span>
                        {director[1].directorRating_cnt}편
                      </p>
                    </div>
                  </div>
                  <div className={style.line}></div>

                  <div id='rank3' className={style.rankprofile}>
                    <div className={style.rankpro_left}>
                      <img
                        className={style.rank_img}
                        src={`https://image.tmdb.org/t/p/original/${director[2].director_image}`}
                      />
                    </div>
                    <div className={style.rankpro_right}>
                      <p className={style.rankpro_name}>
                        {director[2].director_name}
                      </p>
                      <p>
                        {director[2].total}점
                        <span style={{ fontWeight: 'bold' }}>・</span>
                        {director[2].directorRating_cnt}편
                      </p>
                    </div>
                  </div>
                </div>
                <div className={style.rank_right}>
                  <div id='rank4' className={style.rankprofile}>
                    <div className={style.rankpro_left}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${director[3].director_image}`}
                      />
                    </div>
                    <div className={style.rankpro_right}>
                      <p className={style.rankpro_name}>
                        {director[3].director_name}
                      </p>
                      <p>
                        {director[3].total}점
                        <span style={{ fontWeight: 'bold' }}>・</span>
                        {director[3].directorRating_cnt}편
                      </p>
                    </div>
                  </div>
                  <div className={style.line}></div>
                  <div id='rank5' className={style.rankprofile}>
                    <div className={style.rankpro_left}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${director[4].director_image}`}
                      />
                    </div>
                    <div className={style.rankpro_right}>
                      <p className={style.rankpro_name}>
                        {director[4].director_name}
                      </p>
                      <p>
                        {director[4].total}점
                        <span style={{ fontWeight: 'bold' }}>・</span>
                        {director[4].directorRating_cnt}편
                      </p>
                    </div>
                  </div>
                  <div className={style.line}></div>

                  <div id='rank6' className={style.rankprofile}>
                    <div className={style.rankpro_left}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${director[5].director_image}`}
                      />
                    </div>
                    <div className={style.rankpro_right}>
                      <p className={style.rankpro_name}>
                        {director[5].director_name}
                      </p>
                      <p>
                        {director[5].total}점
                        <span style={{ fontWeight: 'bold' }}>・</span>
                        {director[5].directorRating_cnt}편
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default UserDirector;

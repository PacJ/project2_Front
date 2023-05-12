import { baseUrl } from 'Apiurl';
import style from '../../assets/css/analysis.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserActor = () => {
  const { member_id } = useParams();
  const [preferredActor, SetPreferredActor] = useState([]);

  const actor = [...preferredActor];
  console.log(actor);
  console.log(actor.length > 0 ? actor[0].actor_name : '');
  useEffect(() => {
    axios
      .get(`${baseUrl}/analysis/${member_id}`)
      .then((response) => {
        SetPreferredActor(response.data.preferredActor);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {actor.length > 6 ? (
        <div style={{ margin: '10px  auto 0 auto', width: '700px' }}>
          <div className={style.box2}>
            <div className={style.content}>
              <p className={style.title}>선호 배우</p>
              <div className={style.ranking2}>
                <div className={style.rank_left}>
                  <div id='rank1' className={style.rankprofile}>
                    <div className={style.rankpro_left}>
                      <img
                        className={style.rank_img}
                        src={`https://image.tmdb.org/t/p/original/${
                          actor.length > 0 ? actor[0].actor_image : ''
                        }`}
                      />
                    </div>
                    <div className={style.rankpro_right}>
                      <p className={style.rankpro_name}>
                        {actor.length > 0 ? actor[0].actor_name : ''}
                      </p>
                      <p>
                        {actor.length > 0 ? actor[0].total : ''}점
                        <span style={{ fontWeight: 'bold' }}>・</span>{' '}
                        {actor.length > 0 ? actor[0].actorRating_cnt : ''}편
                      </p>
                    </div>
                  </div>
                  <div className={style.line}></div>
                  <div id='rank2' className={style.rankprofile}>
                    <div className={style.rankpro_left}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${
                          actor.length > 0 ? actor[1].actor_image : ''
                        }`}
                      />
                    </div>
                    <div className={style.rankpro_right}>
                      <p className={style.rankpro_name}>
                        {actor.length > 0 ? actor[1].actor_name : ''}
                      </p>
                      <p>
                        {actor.length > 0 ? actor[1].total : ''}점
                        <span style={{ fontWeight: 'bold' }}>・</span>{' '}
                        {actor.length > 0 ? actor[1].actorRating_cnt : ''}편
                      </p>
                    </div>
                  </div>
                  <div className={style.line}></div>
                  <div id='rank2' className={style.rankprofile}>
                    <div className={style.rankpro_left}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${
                          actor.length > 0 ? actor[2].actor_image : ''
                        }`}
                      />
                    </div>
                    <div className={style.rankpro_right}>
                      <p className={style.rankpro_name}>
                        {actor.length > 0 ? actor[2].actor_name : ''}
                      </p>
                      <p>
                        {actor.length > 0 ? actor[2].total : ''}점
                        <span style={{ fontWeight: 'bold' }}>・</span>{' '}
                        {actor.length > 0 ? actor[2].actorRating_cnt : ''}편
                      </p>
                    </div>
                  </div>
                </div>
                <div className={style.rank_right}>
                  <div id='rank1' className={style.rankprofile}>
                    <div className={style.rankpro_left}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${
                          actor.length > 0 ? actor[3].actor_image : ''
                        }`}
                      />
                    </div>
                    <div className={style.rankpro_right}>
                      <p className={style.rankpro_name}>
                        {actor.length > 0 ? actor[3].actor_name : ''}
                      </p>
                      <p>
                        {actor.length > 0 ? actor[3].total : ''}점
                        <span style={{ fontWeight: 'bold' }}>・</span>{' '}
                        {actor.length > 0 ? actor[3].actorRating_cnt : ''}편
                      </p>
                    </div>
                  </div>
                  <div className={style.line}></div>
                  <div id='rank2' className={style.rankprofile}>
                    <div className={style.rankpro_left}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${
                          actor.length > 0 ? actor[4].actor_image : ''
                        }`}
                      />
                    </div>
                    <div className={style.rankpro_right}>
                      <p className={style.rankpro_name}>
                        {actor.length > 0 ? actor[4].actor_name : ''}
                      </p>
                      <p>
                        {actor.length > 0 ? actor[4].total : ''}점
                        <span style={{ fontWeight: 'bold' }}>・</span>{' '}
                        {actor.length > 0 ? actor[4].actorRating_cnt : ''}편
                      </p>
                    </div>
                  </div>
                  <div className={style.line}></div>
                  <div id='rank2' className={style.rankprofile}>
                    <div className={style.rankpro_left}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${
                          actor.length > 0 ? actor[5].actor_image : ''
                        }`}
                      />
                    </div>
                    <div className={style.rankpro_right}>
                      <p className={style.rankpro_name}>
                        {actor.length > 0 ? actor[5].actor_name : ''}
                      </p>
                      <p>
                        {actor.length > 0 ? actor[5].total : ''}점
                        <span style={{ fontWeight: 'bold' }}>・</span>{' '}
                        {actor.length > 0 ? actor[5].actorRating_cnt : ''}편
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

export default UserActor;

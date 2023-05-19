import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Pilmography from './Pilmography';
import style from '../../assets/css/pilmography.module.css';

const CastProfile = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      // Authorization: localStorage.getItem("Authorization"),
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
  };

  const { actor_id, dir_id } = useParams();
  const { id, profileType } = useParams();

  //인물 이름, 사진 경로
  const [castInfo, setCastInfo] = useState({
    name: '',
    profile_path: '',
  });

  //배우가 출연한 영화
  const [castMovieList, setCastMovieList] = useState([]);

  //감독이 감독한 영화
  const [dirMovieList, setDirMovieList] = useState([]);

  const getMovies = async () => {
    await axios
      //profileType: 요청 페이지가 actorProfile || directorProfile인지 받는다.
      .get(`http://localhost:8090/cast/${profileType}/${id}`, config)
      .then((response) => {
        // 요청 profileType이 배우면 배우state(출연한 영화)를 set한다.
        if (profileType === 'actorProfile') {
          setCastMovieList(response.data.castMovieList);

          //요청 배우 인물(사진, 이름)을 담은 castInfo state을 한다.
          setCastInfo({
            name: response.data.actorInfo.name,
            profile_path: response.data.actorInfo.profile_path,
          });
        } else if (profileType === 'dirProfile') {
          // 요청 profileType이 감독이면 감독state(감독한 영화)를 set한다.
          setDirMovieList(response.data.dirMovieList);

          //요청 감독 인물(사진, 이름)을 담은 castInfo state을 set한다.
          setCastInfo({
            name: response.data.dirInfo.name,
            profile_path: response.data.dirInfo.profile_path,
          });
        } else {
          
        }
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getMovies();
  }, [actor_id, dir_id]);

  return (
    <>
      <div style={{ width: '100%', height: '90px' }}></div>
      <div style={{ width: '100%', height: '100%', padding: '20px' }}>
        <div style={{ width: '900px', margin: 'auto' }}>
          <div className={style.profile_box}>
            {/* 인물 사진 존재의 유/무에 따른 사진 출력 */}
            {castInfo && castInfo.profile_path ? (
              <div className={style.castProfile}>
                <div className={style.profile_img_box}>
                  <img
                    //'img-circle img-no-padding img-responsive'
                    className={style.profile_img}
                    src={`https://image.tmdb.org/t/p/original/${castInfo.profile_path}`}
                    alt='배우/감독 사진'
                  />
                </div>
                <div className={style.cast_title}>
                  <p className={style.cast_name}>{castInfo.name}</p>
                  {castMovieList.length > 0 ? (
                    <p
                      className={style.title_set}
                    >{`출연한 영화가 ${castMovieList.length}건 있습니다.`}</p>
                  ) : (
                    <p className={style.title_set}>출연한 영화가 없습니다.</p>
                  )}
                  {dirMovieList.length > 0 ? (
                    <p
                      className={style.title_set}
                    >{`감독 및 제작 한 영화가 ${dirMovieList.length}건 있습니다.`}</p>
                  ) : (
                    <p className={style.title_set}>
                      감독 및 제작한 영화가 없습니다.
                    </p>
                  )}
                </div>

                {/* <p className="text-center">{castInfo.name}</p> */}
              </div>
            ) : (
              <div>
                <div className={style.castProfile}>
                  <div className={style.profile_img_box}>
                    <img
                      className={style.profile_img}
                      //인물 사진이 없을 시 기본 사진 경로("public\pepeAk.png")
                      src='\pepeAk.png'
                      alt='배우/감독 사진이 없습니다.'
                    />
                  </div>
                  <div className={style.cast_title}>
                    <p className={style.cast_name}>{castInfo.name}</p>
                    {castMovieList.length > 0 ? (
                      <p
                        className={style.title_set}
                      >{`출연한 영화가 ${castMovieList.length}건  있습니다.`}</p>
                    ) : (
                      <p className={style.title_set}>출연한 영화가 없습니다.</p>
                    )}
                    {dirMovieList.length > 0 ? (
                      <p
                        className={style.title_set}
                      >{`감독 및 제작 한 영화가  ${dirMovieList.length}건 있습니다.`}</p>
                    ) : (
                      <p className={style.title_set}>
                        감독 및 제작한 영화가 없습니다.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <Pilmography castMovieList={castMovieList} dirMovieList={dirMovieList}/>
        </div>
      </div>
    </>
  );
};

export default CastProfile;

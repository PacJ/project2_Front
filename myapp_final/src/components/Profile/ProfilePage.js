import ProfileHeader from './ProfileHeader';
import { useState } from 'react';
import { ProfileAction } from 'reduxs/Actions/ProfileAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ProfileList from './ProfileList';
import style from '../../assets/css/profile.module.css';
import EditModal from './EditModal';
import '../../assets/css/modal.css';
import EditImgModal from './EditImgModal';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import Favorite from './Favorite';
import { MovieActions } from 'reduxs/Actions/MovieAction';

const ProfilePage = () => {
  //리스트 선언 모음
  const { member_id } = useParams();
  const dispatch = useDispatch();

  const wishList = useSelector((state) => state.profile.wishList);
  const ratingList = useSelector((state) => state.profile.ratingList);
  const memberInfo = useSelector((state) => state.profile.memberInfo);
  const memberFavorite = useSelector((state) => state.movie.memberFavorite);

  //추가
  const [recList, setRecList] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(ProfileAction.getProfileList(member_id));
    dispatch(MovieActions.getFavoriteByMemberId(member_id));
    getRecommendations();
  }, []);

  //config 추가
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    },
  };

  // 추가. 페이지 들어오자마자 가져오기.
  const getRecommendations = () => {
    if (localStorage.getItem('member_id') === member_id) {
      setLoading(true);
      axios
        .get(`http://localhost:8090/recommend/${member_id}`, config)
        .then((response) => {
          console.log('호출됨!');
          console.log(response.data);
          setRecList(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  const [editShow, setEditShow] = useState(false);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = () => setEditShow(true);

  const [editImgShow, setEditImgShow] = useState(false);
  const handleEditImgClose = () => setEditImgShow(false);
  const handleEditImgShow = () => setEditImgShow(true);

  return (
    <>
      <div className='d-flex flex-column min-vh-100'>
        <div className='section'>
          <div className={style.wrap}>
            <ProfileHeader
              handleEditShow={handleEditShow}
              handleEditImgShow={handleEditImgShow}
              memberInfo={memberInfo}
              member_id={member_id}
            />
            <EditModal
              isOpen={editShow}
              onRequestClose={handleEditClose}
              memberInfo={memberInfo}
              member_id={member_id}
            />
            <EditImgModal
              isOpen={editImgShow}
              onRequestClose={handleEditImgClose}
              memberInfo={memberInfo}
              member_id={member_id}
            />

            {memberInfo &&
            memberInfo.nickname !== '존재하지 않는 회원입니다' ? (
              (memberInfo && memberInfo.visibility === 1) ||
              localStorage.getItem('member_id') === member_id ? (
                <>
                  <div style={{ height: '50px' }}></div>
                  <Favorite memberInfo={memberInfo} memberFavorite={memberFavorite}/>
                  <div style={{ margin: 'auto' }}></div>
                  <div style={{ height: '270px' }}></div>
                </>
              ) : (
                ''
              )
            ) : (
              ''
            )}

            {memberInfo &&
            memberInfo.nickname !== '존재하지 않는 회원입니다' ? (
              (memberInfo && memberInfo.visibility === 1) ||
              localStorage.getItem('member_id') === member_id ? (
                <>
                  {ratingList && ratingList.length > 0 ? (
                    <p
                      style={{
                        fontSize: '15pt',
                        padding: '10px',
                        fontFamily: 'NanumSquare',
                        fontWeight: 'bold',
                      }}
                    >
                      평가를 완료한 영화
                      <Link
                        to={{
                          pathname: `/profilelistmore/rating/${member_id}`,
                        }}
                      >
                        <span>
                          <a style={{ fontSize: '12pt' }}>　더보기</a>
                        </span>
                      </Link>
                    </p>
                  ) : (
                    <p
                      style={{
                        fontSize: '15pt',
                        padding: '10px',
                        fontFamily: 'NanumSquare',
                        fontWeight: 'bold',
                      }}
                    >
                      평가를 남긴 영화가 없습니다.
                    </p>
                  )}
                  <ProfileList movies={ratingList} />
                </>
              ) : (
                <div></div>
              )
            ) : (
              <div></div>
            )}
            {/* <ProfileList movies={ratingList} /> */}
            <div style={{ height: '50px' }}></div>
            {memberInfo &&
            memberInfo.nickname !== '존재하지 않는 회원입니다' ? (
              (memberInfo && memberInfo.visibility === 1) ||
              String(localStorage.getItem('member_id')) ===
                String(memberInfo.member_id) ? (
                <>
                  {wishList && wishList.length > 0 ? ( // true면 랜더링할 html
                    <p
                      style={{
                        fontSize: '15pt',
                        padding: '10px',
                        fontFamily: 'NanumSquare',
                        fontWeight: 'bold',
                      }}
                    >
                      보고싶어요
                      <Link
                        to={{
                          pathname: `/profilelistmore/wish/${member_id}`,
                        }}
                      >
                        <span>
                          <a style={{ fontSize: '12pt' }}>　더보기</a>
                        </span>
                      </Link>
                    </p>
                  ) : (
                    // false면 랜더링할 html
                    <p
                      style={{
                        fontSize: '15pt',
                        padding: '10px',
                        fontFamily: 'NanumSquare',
                        fontWeight: 'bold',
                      }}
                    >
                      보고싶은 영화가 없습니다.
                    </p>
                  )}
                  <ProfileList movies={wishList} />
                </>
              ) : (
                <div></div>
              )
            ) : (
              <div></div>
            )}

            <div style={{ height: '50px' }}></div>

            {loading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '100px',
                }}
              >
                {' '}
                <p
                  style={{
                    fontSize: '15pt',
                    padding: '10px',
                    fontFamily: 'NanumSquare',
                    fontWeight: 'bold',
                  }}
                >
                  {localStorage.getItem('nickname')}님을 위한 추천 영화를
                  불러오는중입니다.
                </p>
                <PulseLoader color='#e75757' size={40} />
              </div>
            )}
            {localStorage.getItem('member_id') === member_id
              ? recList &&
                recList.length > 0 && (
                  <>
                    <p
                      style={{
                        fontSize: '15pt',
                        padding: '10px',
                        fontFamily: 'NanumSquare',
                        fontWeight: 'bold',
                      }}
                    >
                      {ratingList &&
                        ratingList[0].title +
                          '! 재밌게 보셨다면?'}
                    </p>
                    <ProfileList movies={recList} />
                  </>
                )
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
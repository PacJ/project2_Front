import ProfileHeader from './ProfileHeader';
import { useState } from 'react';
import { ProfileAction } from 'reduxs/Actions/ProfileAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ProfileList from './ProfileList';
import style from '../../assets/css/profile.module.css';
import EditImg from 'components/Member/EditImg';
import EditModal from './EditModal';
import '../../assets/css/modal.css';
import EditImgModal from './EditImgModal';
import RecList from './RecList';
import Recommend from 'components/Recommend/Recommend';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  //리스트 선언 모음
  const { member_id } = useParams();
  //const member_id = localStorage.getItem('member_id');
  const dispatch = useDispatch();

  const wishList = useSelector((state) => state.profile.wishList);
  const ratingList = useSelector((state) => state.profile.ratingList);
  const memberInfo = useSelector((state) => state.profile.memberInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(ProfileAction.getProfileList(member_id));
  }, []);

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
            <ProfileHeader handleEditShow={handleEditShow} handleEditImgShow={handleEditImgShow} memberInfo={memberInfo}/>
            <EditModal isOpen={editShow} onRequestClose={handleEditClose} memberInfo={memberInfo}/>
            <EditImgModal isOpen={editImgShow} onRequestClose={handleEditImgClose} memberInfo={memberInfo}/>
          <div style={{ margin: 'auto' }}>
          </div>
            <div style={{ height: '50px' }}></div>
            {memberInfo && memberInfo.visibility === 1 ? (
              ratingList && ratingList.length > 0 ? (
                <p
                  style={{
                    fontSize: "15pt",
                    padding: "10px",
                    fontFamily: "NanumSquare",
                    fontWeight: "bold",
                  }}
                >
                  평가를 완료한 영화
                  <span>
                    <a
                      href={`/profilelistmore/rating`}
                      style={{ fontSize: "12pt" }}
                    >
                      　더보기
                    </a>
                  </span>
                </p>
              ) : (
                <p
                  style={{
                    fontSize: "15pt",
                    padding: "10px",
                    fontFamily: "NanumSquare",
                    fontWeight: "bold",
                  }}
                >
                  평가를 남긴 영화가 없습니다.
                </p>
              )
            ) : (
              <p
                style={{
                  fontSize: "15pt",
                  padding: "10px",
                  fontFamily: "NanumSquare",
                  fontWeight: "bold",
                }}
              >
                공개되지 않은 프로필 입니다.
              </p>
            )}
            <ProfileList movies={ratingList} />
            <div style={{ height: '50px' }}></div>
            {memberInfo && memberInfo.visibility === 1 ? (
              wishList && wishList.length > 0 ? (
                // true면 랜더링할 html
                <p
                  style={{
                    fontSize: "15pt",
                    padding: "10px",
                    fontFamily: "NanumSquare",
                    fontWeight: "bold",
                  }}
                >
                  보고싶어요
                  <span>
                    <a
                      style={{ fontSize: "12pt" }}
                      href={`/profilelistmore/wish`}
                    >
                      　더보기
                    </a>
                  </span>
                </p>
              ) : (
                // false면 랜더링할 html
                <p
                  style={{
                    fontSize: "15pt",
                    padding: "10px",
                    fontFamily: "NanumSquare",
                    fontWeight: "bold",
                  }}
                >
                  보고싶은 영화가 없습니다.
                </p>
              )
            ) : (
              <p
                style={{
                  fontSize: "15pt",
                  padding: "10px",
                  fontFamily: "NanumSquare",
                  fontWeight: "bold",
                }}
              >
                공개되지 않은 프로필 입니다.
              </p>
            )}
            <ProfileList movies={wishList} />
            <div style={{ height: '50px' }}></div>
            <RecList />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

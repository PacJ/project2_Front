import ProfileHeader from "./ProfileHeader";
import { useState } from "react";
import { ProfileAction } from "reduxs/Actions/ProfileAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProfileList from "./ProfileList";
import style from "../../assets/css/profile.module.css";
import EditImg from "components/Member/EditImg";
import EditModal from "./EditModal";
import "../../assets/css/modal.css";
import EditImgModal from "./EditImgModal";
import Recommend from "components/Recommend/Recommend";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import axios from "axios";

const ProfilePage = () => {
  //리스트 선언 모음
  const { member_id } = useParams();

  //추가
  const [recList, setRecList] = useState(false);
  const [loading, setLoading] = useState(false);

  //const member_id = localStorage.getItem('member_id');
  const dispatch = useDispatch();

  const wishList = useSelector((state) => state.profile.wishList);
  const ratingList = useSelector((state) => state.profile.ratingList);
  const memberInfo = useSelector((state) => state.profile.memberInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(ProfileAction.getProfileList(member_id));
    //getRecommendations 호출 추가
    getRecommendations();
  }, []);

  //config 추가
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
  };

  // 추가. 페이지 들어오자마자 가져오기.
  const getRecommendations = () => {
    if (localStorage.getItem("member_id") === member_id) {
      setLoading(true);
      axios
        .get(`http://localhost:8090/recommend/${member_id}`, config)
        .then((response) => {
          console.log("호출됨!");
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
      <div className="d-flex flex-column min-vh-100">
        <div className="section">
          <div className={style.wrap}>
            <ProfileHeader
              handleEditShow={handleEditShow}
              handleEditImgShow={handleEditImgShow}
              memberInfo={memberInfo}
            />
            <EditModal
              isOpen={editShow}
              onRequestClose={handleEditClose}
              memberInfo={memberInfo}
            />
            <EditImgModal
              isOpen={editImgShow}
              onRequestClose={handleEditImgClose}
              memberInfo={memberInfo}
            />
            <div style={{ margin: "auto" }}></div>
            <div style={{ height: "50px" }}></div>
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
            <div style={{ height: "50px" }}></div>
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

            {/* 추가 */}
            <div style={{ height: "50px" }}></div>
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
                <p
                  style={{
                    fontSize: "15pt",
                    padding: "10px",
                    fontFamily: "NanumSquare",
                    fontWeight: "bold",
                  }}
                >
                  {localStorage.getItem("nickname")}님을 위한 추천 영화를
                  불러오는중입니다.
                </p>
                <PulseLoader color="#e75757" size={40} />
              </div>
            )}
            {localStorage.getItem("member_id") === member_id
              ? recList &&
                recList.length > 0 && <ProfileList movies={recList} />
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

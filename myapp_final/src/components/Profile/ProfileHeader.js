import { faHeart, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "../../assets/css/profile.module.css";
import { baseUrl } from "Apiurl";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Tooltip from "@mui/material/Tooltip";

const ProfileHeader = ({
  handleEditShow,
  handleEditImgShow,
  memberInfo,
  member_id,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [grade, setGrade] = useState(4);
  const [profilePath, setProfilePath] = useState("");

  useEffect(() => {
    if (memberInfo != undefined) {
      setIsLoggedIn(localStorage.getItem("member_id") == memberInfo.member_id);
      setGrade(memberInfo.grade);
      setProfilePath(memberInfo.profile_path);
    }
  }, [memberInfo]);

  let gradeImgPath = "";
  switch (grade) {
    case 3:
      gradeImgPath = "동.png";
      break;
    case 2:
      gradeImgPath = "은.png";
      break;
    case 1:
      gradeImgPath = "금.png";
      break;
    default:
      gradeImgPath = "동.png";
      break;
  }

  let gradeText = "";
  switch (grade) {
    case 1:
      gradeText = "골드 등급입니다.";
      break;
    case 2:
      gradeText = "실버 등급입니다.";
      break;
    case 3:
      gradeText = "브론즈 등급입니다.";
      break;
    default:
      gradeText = "등급을 올려보세요!";
      break;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("Authorization"),
    },
  };

  const [confirmModalOpen, setConfirmModalOpen] = useState(false); // 회원 탈퇴 확인 모달 상태

  // 회원 탈퇴 처리
  const handleDelete = async () => {
    const member = {
      member_id: memberInfo.member_id,
      name: "",
      nickname: "",
      email: "",
      password: "",
    };

    await axios.post(`${baseUrl}/profile/delete`, member, config).then(() => {
      console.log("회원 탈퇴 성공");
      // 회원 탈퇴 성공 처리
      window.location.replace("/logout");
    });
  };

  // 회원 탈퇴 확인 모달 열기
  const openConfirmModal = () => {
    setConfirmModalOpen(true);
  };

  // 회원 탈퇴 확인 모달 닫기
  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
  };
  return (
    <>
      {memberInfo && memberInfo.nickname !== "존재하지 않는 회원입니다" ? (
        (memberInfo && memberInfo.visibility === 1) ||
        String(localStorage.getItem("member_id")) ===
          String(memberInfo.member_id) ? (
          memberInfo !== undefined && (
            <div className={style.header_wrap}>
              {grade !== 4 ? (
                <img
                  style={{
                    position: "absolute",
                    width: "50px",
                    top: "180px",
                    left: "420px",
                    zIndex: 99,
                  }}
                  src={`${process.env.PUBLIC_URL}/gradeimg/${gradeImgPath}`}
                ></img>
              ) : (
                ""
              )}
              <div className={style.profile}>
                <div className={style.left}>
                  <div className={style.profile_img}>
                    <img
                      src={`${process.env.PUBLIC_URL}/profiles/${profilePath}`}
                      alt="프로필 이미지"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "8%",
                        border: "1px solid black",
                      }}
                    />
                  </div>
                </div>
                <div className={style.right}>
                  <p style={{ fontSize: "12pt" }}>
                    {memberInfo && memberInfo.nickname ? (
                      <>
                        <span style={{ fontWeight: "bold" }}>
                          {memberInfo.nickname}
                        </span>
                        님의 페이지
                        {isLoggedIn &&
                          localStorage.getItem("member_id") === member_id && (
                            <FontAwesomeIcon
                              icon={faPencil}
                              style={{
                                fontWeight: "lighter",
                                cursor: "pointer",
                                width: "13px",
                                paddingTop: "3px",
                                marginLeft: "7px",
                                color: "white",
                              }}
                              onClick={() => handleEditImgShow()}
                            />
                          )}
                      </>
                    ) : (
                      <>아무개 님의 페이지</>
                    )}
                  </p>
                  <p>{gradeText}</p>
                </div>
              </div>
              <div className={style.nav}>
                {isLoggedIn &&
                  localStorage.getItem("member_id") === member_id && (
                    <Tooltip title="더 많은 작품을 평가해보세요!" arrow>
                      <span>
                        <Link
                          to={{
                            pathname: `/review`,
                          }}
                        >
                          <span
                            className={style.button}
                            onMouseOver={(e) =>
                              (e.target.style.backgroundColor = "#bc3e3e")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.backgroundColor = "#ce4545")
                            }
                          >
                            평가하기
                          </span>
                        </Link>
                      </span>
                    </Tooltip>
                  )}

                <Tooltip title="사용자님의 취향을 분석해보세요!" arrow>
                  <Link
                    to={{
                      pathname: `/analysis/${memberInfo.member_id}`,
                      state: { memberInfo: memberInfo },
                    }}
                  >
                    <span>
                      <span
                        className={style.button}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#bc3e3e")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#ce4545")
                        }
                      >
                        취향분석
                      </span>
                    </span>
                  </Link>
                </Tooltip>

                {isLoggedIn &&
                  localStorage.getItem("member_id") === member_id && (
                    <Tooltip title="사용자님의 선호장르를 선택하세요!" arrow>
                      <span>
                        <Link
                          to={{
                            pathname: `/genreselect`,
                          }}
                        >
                          <span
                            className={style.button}
                            onMouseOver={(e) =>
                              (e.target.style.backgroundColor = "#bc3e3e")
                            }
                            onMouseOut={(e) =>
                              (e.target.style.backgroundColor = "#ce4545")
                            }
                          >
                            선호장르
                          </span>
                        </Link>
                      </span>
                    </Tooltip>
                  )}

                {isLoggedIn &&
                  localStorage.getItem("member_id") === member_id && (
                    <Tooltip title="사용자님의 정보를 변경하세요!" arrow>
                      <span>
                        <span
                          onClick={() => handleEditShow()}
                          className={style.button}
                          onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#bc3e3e")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "#ce4545")
                          }
                        >
                          정보수정
                        </span>
                      </span>
                    </Tooltip>
                  )}
              </div>
            </div>
          )
        ) : (
          <div style={{ margin: "auto" }}>
            <div
              style={{
                width: "1100px",
                margin: "150px auto 0 auto",
                textAlign: "center",
                height: "550px",
                position: "relative",
                paddingTop: "120px",
                backgroundImage:
                  "url(" + require("assets/img/ticket.png") + ")",
                backgroundPosition: "center bottom",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p
                style={{
                  fontSize: "15pt",
                  position: "absolute",
                  top: "280px",
                  left: "430px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>비공개</span> 프로필입니다.
              </p>
              <div
                style={{
                  margin: "auto",
                }}
              ></div>
            </div>
          </div>
        )
      ) : (
        <div style={{ margin: "auto" }}>
          <div
            style={{
              width: "1100px",
              margin: "150px auto 0 auto",
              textAlign: "center",
              height: "550px",
              position: "relative",
              paddingTop: "120px",
              backgroundImage: "url(" + require("assets/img/ticket.png") + ")",
              backgroundPosition: "center bottom",
              backgroundRepeat: "no-repeat",
            }}
          >
            <p
              style={{
                fontSize: "15pt",
                position: "absolute",
                top: "280px",
                left: "410px",
              }}
            >
              <span style={{ fontWeight: "bold" }}>존재하지 않는</span>{" "}
              프로필입니다.
            </p>
            <div
              style={{
                margin: "auto",
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;

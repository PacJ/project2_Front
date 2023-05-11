import { Button, Container, Modal } from "reactstrap";
import ProfileHeader from "./ProfileHeader";
import UserReviewList from "./UserReviewList";
import WishList from "./WishList";
import EditInfo from "components/Member/Editinfo";
// import  from 'components/Member/';
import Recommend from "components/Recommend/Recommend";
import RecList from "./RecList";
// import Loading from "components/Loading/Loading";
// import { PulseLoader } from "react-spinners";

const ProfilePage = () => {
  // 로그인 여부를 확인하는 코드
  const isLoggedIn = !!localStorage.getItem("Authorization");

  // 로그인하지 않은 사용자일 경우, /login으로 Redirect 시킨다.
  if (!isLoggedIn) {
    window.location.replace("/Login");
  }

  return (
    <>
      <ProfileHeader />
      <div style={{ height: "150px" }}></div>
      <div
        style={{
          margin: "auto",
          width: "1280px",
          borderBottom: "1px solid #767980",
        }}
      >
        <EditInfo />
        {/* < /> */}
      </div>
      <div style={{ height: "150px" }}></div>
      <UserReviewList />
      <div style={{ height: "150px" }}></div>
      <div
        style={{
          margin: "auto",
          width: "1280px",
          borderBottom: "1px solid #767980",
        }}
      ></div>
      <div style={{ height: "150px" }}></div>
      <WishList />
      <div style={{ height: "150px" }}></div>
      <div
        style={{
          margin: "auto",
          width: "1280px",
          borderBottom: "1px solid #767980",
        }}
      ></div>
      <div style={{ height: "100px" }}></div>

      <div>
        <Recommend />
        <RecList />
      </div>
    </>
  );
};

export default ProfilePage;

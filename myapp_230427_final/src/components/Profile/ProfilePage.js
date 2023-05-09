import { Button, Container, Modal } from "reactstrap";
import ProfileHeader from "./ProfileHeader";
import UserReviewList from "./UserReviewList";
import WishList from "./WishList";
import RecList from "./RecList";

const ProfilePage = () => {
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
      ></div>
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
      <RecList />
    </>
  );
};

export default ProfilePage;

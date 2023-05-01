import { useSelector } from "react-redux";
import { Container } from "reactstrap";

const MemberReviewInfo = () => {
  const memberReview = useSelector((state) => state.movie.memberReview);

  return (
    <Container>
      <div className="mt-5">
        <h3>내가 작성한 코멘트</h3>
        <div>{memberReview.content}</div>
      </div>
    </Container>
  )
}

export default MemberReviewInfo;
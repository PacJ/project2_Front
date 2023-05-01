import { Link } from "react-router-dom";
import { Col, Container, Row } from 'reactstrap';
import likes from '../../assets/img/likes.svg';
import profiePic from '../../assets/img/180c6e128821941b1.jpg';

const Comments = ({ contents = {}, handleAuthShow }) => {
  const comments = Array.isArray(contents.reviewDTO) ? contents.reviewDTO : [];
  
  const handleLikeClick = () => {
    if (localStorage.getItem('member_id')) {
      
    } else {
      handleAuthShow();
    }
  }

  return (
    <>
      <Container>
        <Row className="my-5">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h3>코멘트</h3>
              <Link to="/comment" style={{paddingRight:'20px'}}>More</Link>
            </div>
              {comments && comments.length > 0 ? (comments
                .filter((comment) => comment.content && comment.content.trim() !== '')
                .map((comment) => (
                <div key={comment.movie_id} className="comment-box bg-light p-3 mb-3">
                  <div className="d-flex align-items-center">
                    <img src={profiePic} className="profile-pic rounded-circle mx-3"/>
                    <div className="ml-2">
                      <div className="mt-2">{comment.member_id}</div>
                      <p>★ {comment.rating !== 0 ? comment.rating : '평가없음'}</p>
                    </div>
                  </div>
                  <p className="text-justify ml-2 mt-3 mb-5">{comment.content}</p>
                  <div className="d-flex justify-content-between">
                    <span><img src={likes} className="ml-2" /><span className="pt-2 pl-1">{comment.likes}</span></span>
                    <button className="btn btn-primary" onClick={handleLikeClick}>Like</button>
                  </div>
                </div>
              ))) : (<p className="d-flex justify-content-center py-5">작성된 코멘트가 없습니다.</p>)}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Comments;
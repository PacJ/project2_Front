import { Link } from "react-router-dom";
import { Col, Container, Row } from 'reactstrap';
import likes from '../../assets/img/likes.svg';

const Comments = () => {
  const comments = [
    {
      id: 1,
      username: '서여미',
      profilePic: require('assets/img/180c6e128821941b1.jpg'),
      rating: 4.5,
      comment: '고양이 귀여워',
      likes: 10,
    },
    {
      id: 2,
      username: '서여미',
      profilePic: require('assets/img/180c6e128821941b1.jpg'),
      rating: 4.5,
      comment: '고양이 귀여워',
      likes: 10,
    }
  ];

  return (
    <>
      <Container>
        <Row className="my-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h3>코멘트</h3>
              <Link to="/comment" style={{paddingRight:'20px'}}>More</Link>
            </div>
              {comments.map((comment) => (
                <div key={comment.id} className="comment-box bg-light p-3 mb-2">
                  <div className="d-flex align-items-center">
                    <img src={comment.profilePic} className="profile-pic rounded-circle mx-3"/>
                    <div className="ml-2">
                      <div className="mt-2">{comment.username}</div>
                      <p>★ {comment.rating}</p>
                    </div>
                  </div>
                  <p className="text-justify ml-2 mt-3 mb-5">{comment.comment}</p>
                  <div className="d-flex justify-content-between">
                    <span><img src={likes} className="ml-2" /><span className="pt-2 pl-1">{comment.likes}</span></span>
                    <button className="btn btn-primary">Like</button>
                  </div>
                </div>
              ))}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Comments;
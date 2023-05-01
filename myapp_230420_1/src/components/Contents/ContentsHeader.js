import CommentModal from 'components/Comment/CommentModal';
import { useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import '../../assets/css/commentmodal.css';

const ContentsHeader = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div fluid className="banner-container">
        <div className='banner-overlay'></div>
        <img src={require('assets/img/5LWF3lOtEZ08JPGFH3kc1g.jpg')} alt="Main centered image" className="banner-image" />
      </div>
      <Container>
        <Row className="my-4">
          <Col md="2">
            <div className="movie-poster-wrapper">
              <img src={require('assets/img/9XDeIclRe6SdKDknD_aGWg.jpg')} alt="Movie Poster" className="movie-poster img-fluid" />
            </div>
          </Col>
          <Col md="10">
            <div className='movie-basic p-1 mt-0'>
              <h2>스즈메의 문단속</h2>
              <div className='border-bottom'>
                <span>2022 ・ 애니메이션/모험/액션 ・ 일본</span>
              </div>
              <div className='border-bottom'>
                <p>평균 ★ 4.5</p>
              </div>
              <div>
                <Button className='m-1' color="primary">보고싶어요</Button>
                <Button className='m-1' color="secondary" onClick={handleShow}>코멘트</Button>
                <CommentModal isOpen={show} onRequestClose={handleClose} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ContentsHeader;
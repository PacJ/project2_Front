import { Col, Container, Row } from 'reactstrap';

const BasicInfo = ({ contents = {} }) => {
  return (
    <>
      <Container>
        <Row className="my-5">
          <Col>
            <div className='movie-detail' >
              <h3>기본정보</h3>
              <div className='mt-3'>
                <p className='original-title'>{contents.original_title}</p>
                <p>{contents.release_date} ・ {' '}{contents.genreDTO ? contents.genreDTO.map((genre) => genre.name).join('/') : null} ・ {contents.country}</p>
                <p>{contents.runtime}분 · 12세</p>
              </div>
              <div>
                <p className='text-justify'>{contents.overView}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default BasicInfo;
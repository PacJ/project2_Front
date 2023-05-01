import { Button, Col, Container, Row } from "reactstrap";

const CommentPage = () => {
	return (
		<div className="section">
			<Container>
			<Row className="my-4">
          <Col md="2">
            <div className="movie-poster-wrapper">
              코멘트코멘트리스트
            </div>
          </Col>
        </Row>
			</Container>
		</div>
	)
}

export default CommentPage;
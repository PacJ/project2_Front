import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

const CastInfo = ({ contents = {} }) => {
  const directors = Array.isArray(contents.directorDTO) ? contents.directorDTO : [];
  const actors = Array.isArray(contents.actorDTO) ? contents.actorDTO : [];

  const totalItems = [...directors, ...actors].map((item) => ({
    id: item.actor_id || item.director_id,
    name: item.name,
    image: `https://image.tmdb.org/t/p/w200/${item.profile_path}`,
    role: item.actor_id ? 'Actor' : 'Director',
  }));

  const preloadImages = (items) => {
    items.forEach(item => {
      const img = new Image();
      img.src = item.image;  // 각 item에서 image URL을 가져옵니다.
    });
  };
  
  useEffect(() => {
    preloadImages(totalItems);
  }, [totalItems]);

  const itemsPerRow = 3;
  const numberOfRows = 2;
  const itemsPerPage = itemsPerRow * numberOfRows;

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage >= 0 ? prevIndex - itemsPerPage : prevIndex));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage < totalItems.length ? prevIndex + itemsPerPage : prevIndex));
  };

  const visibleItems = totalItems.slice(currentIndex, currentIndex + itemsPerPage);

  const rows = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    const cols = [];

    for (let colIndex = 0; colIndex < itemsPerRow; colIndex++) {
      const currentItem = visibleItems[rowIndex * itemsPerRow + colIndex];
      if (currentItem) {
        cols.push(
          <React.Fragment key={currentItem.id} >
            <Col md="1" className="p-2">
              <Link to={currentItem.role === 'Actor' ? `/cast/actorProfile/${currentItem.id}` : `/cast/dirProfile/${currentItem.id}`}>
                <img src={currentItem.image} alt={currentItem.name} className="pro-img rounded-square"/>
              </Link>
            </Col>
            <Col className='mt-3 p-2 ml-5'>
              <p className='name'>{currentItem.name}</p>
              <p>{currentItem.role}</p>
            </Col>
          </React.Fragment>
        );
      }
    }

    rows.push(<Row key={rowIndex}>{cols}</Row>);
  }

  return (
    <Container>
      <h3>출연/제작</h3>
      <Row className="castinfo my-4">
        <Col md="10" className="mx-auto">
          <div className="p-1">
            {rows}
            <button onClick={handlePrevClick} className="prev_button">
              <img src={require('assets/img/left.png')}></img>
            </button>
            <button onClick={handleNextClick} className='next_button'>
              <img src={require('assets/img/right.png')}></img>
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default CastInfo;
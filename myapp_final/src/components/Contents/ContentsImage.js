import { useEffect, useState } from "react";
import Modal from 'react-modal';

const { Container, Row } = require("reactstrap")

const ContentsImage = ({ contents = {} }) => {
  const images = Array.isArray(contents.imagesDTO) ? contents.imagesDTO : [];

  const itemsPerSlide = 3;
  const [currentIndex, setCurrentIndex] = useState(0);

  const preloadImages = (images) => {
    images.forEach(image => {
      const img = new Image();
      img.src = `https://image.tmdb.org/t/p/w400/${image.filepath}`;
    });
  };
  
  useEffect(() => {
    preloadImages(images);
  }, [images]);

  const imageCols = images.map((image, index) => (
    <div key={index} className="img-item p-2" style={{ display: (index >= currentIndex && index < currentIndex + itemsPerSlide) ? 'block' : 'none' }} onClick={() => openModal(index)}>
      <img
        src={`https://image.tmdb.org/t/p/w400/${image.filepath}`}
        alt={`Movie Image ${index}`}
      />
    </div>
  ));
  
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - itemsPerSlide >= 0 ? prevIndex - itemsPerSlide : prevIndex));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerSlide < images.length ? prevIndex + itemsPerSlide : prevIndex));
  };

  // 모달
  const [modal, setModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const openModal = (index) => {
    setModalImageIndex(index);
    setModal(true);
  };
  
  const closeModal = () => {
    setModal(false);
  };
  
  const goToPrevImage = () => {
    setModalImageIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex));
  };
  
  const goToNextImage = () => {
    setModalImageIndex((prevIndex) =>
      prevIndex + 1 < images.length ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <>
      <Container>
        <div className="my-4">
          <div>
            <h3>갤러리</h3>
            <div className="img-box">
              <Row 
                className="img-slide d-flex justify-content-center"
                //style={{ transform: `translateX(-${currentIndex * 100 / itemsPerSlide}%)` }}
              >
                {imageCols}
              </Row>
              <button onClick={handlePrevClick} className="prev_button">
                <img src={require('assets/img/left.png')}></img>
              </button>
              <button onClick={handleNextClick} className='next_button'>
                <img src={require('assets/img/right.png')}></img>
              </button>
            </div>
          </div>
        </div>
      </Container>
      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="FullScreenModal"
        overlayClassName="FullScreenModalOverlay"
      >
        <div className="full-screen-modal-content text-center d-flex align-items-center justify-content-center">
          <button
            onClick={goToPrevImage}
            disabled={modalImageIndex === 0}
            className="prev_button mr-3"
          >
            <img src={require('assets/img/left.png')}></img>
          </button>
          <img src=
            {images[modalImageIndex] && images[modalImageIndex].filepath
            ? `https://image.tmdb.org/t/p/original/${images[modalImageIndex].filepath}`
            : null}
            alt={`Movie Image ${modalImageIndex}`}/>
          <button
            onClick={goToNextImage}
            disabled={modalImageIndex === images.length - 1}
            className="next_button ml-3"
          >
            <img src={require('assets/img/right.png')}></img>
          </button>
        </div>
      </Modal>
    </>
  )
}

export default ContentsImage;
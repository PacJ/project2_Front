//사용자가 별점 평가를 남길 수 있는 영화 리스트 페이지
import React, { useState } from 'react';
import { Button, Modal } from 'reactstrap';
import '../../assets/css/moviemodal.css';
import ReviewModal from './MovieDetailModal';

const ReviewPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: '150px' }}>
      <div className="container">
        <header className="my-4">
          <div className="row">
            <div className="col mb-3">
              <h2 className="text-center mb-3">1</h2>
              <p className="text-center">작품을 평가해보세요. 당신의 취향에 딱 맞는 작품을 추천해드릴게요.</p>
            </div>
          </div>
          <button className='btn btn-primary'>랜덤 영화</button>
        </header>

        <div className="row">
          <div className="col">
            <ul className='pl-0'>
              <li className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-3">
                    <img src="https://an2-img.amz.wtchn.net/image/v2/cieT7gGSMHncWBrbSgOqeg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qZ3dlRFF3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMMmhxY1hkaWNHaHdaRzV6ZERSa2JXZGpkVFY2SW4wLmxmQ0dlNFNFcG1VYWtGTVM1b3htOFJqaTVFZ2hXX2VrVnVVZHZ6VDExMUE" alt="movie" className="img-fluid" />
                  </div>
                  <div className="col-9">
                    <h3 className="mb-0">살인자의 기억법</h3>
                    <div className='mb-3'>2016 ・ 한국</div>
                    <Button color="secondary" onClick={handleShow}>
                      자세히 보기
                    </Button>
                    <ReviewModal show={show} handleClose={handleClose} />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-3">
                    <img src="https://an2-img.amz.wtchn.net/image/v2/cieT7gGSMHncWBrbSgOqeg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qZ3dlRFF3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMMmhxY1hkaWNHaHdaRzV6ZERSa2JXZGpkVFY2SW4wLmxmQ0dlNFNFcG1VYWtGTVM1b3htOFJqaTVFZ2hXX2VrVnVVZHZ6VDExMUE" alt="movie" className="img-fluid" />
                  </div>
                  <div className="col-9">
                    <h3 className="mb-0">살인자의 기억법</h3>
                    <div className='mb-3'>2016 ・ 한국</div>
                    <Button color="secondary" onClick={handleShow}>
                      자세히 보기
                    </Button>
                    <ReviewModal show={show} handleClose={handleClose} />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row align-items-center">
                  <div className="col-3">
                    <img src="https://an2-img.amz.wtchn.net/image/v2/cieT7gGSMHncWBrbSgOqeg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk1qZ3dlRFF3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMMmhxY1hkaWNHaHdaRzV6ZERSa2JXZGpkVFY2SW4wLmxmQ0dlNFNFcG1VYWtGTVM1b3htOFJqaTVFZ2hXX2VrVnVVZHZ6VDExMUE" alt="movie" className="img-fluid" />
                  </div>
                  <div className="col-9">
                    <h3 className="mb-0">살인자의 기억법</h3>
                    <div className='mb-3'>2016 ・ 한국</div>
                    <Button color="secondary" onClick={handleShow}>
                      자세히 보기
                    </Button>
                    <ReviewModal show={show} handleClose={handleClose} />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewPage;

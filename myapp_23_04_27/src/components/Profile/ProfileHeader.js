import { Button } from 'reactstrap';

const ProfileHeader = () => {
  return (
    <>
      <div
        className='profile'
        style={{
          margin: 'auto',
          textAlign: 'center',
          height: '650px',
          backgroundColor: '#343A40',
          paddingTop: '220px',
        }}
      >
        <div
          style={{
            marginBottom: '30px',
            fontSize: '25pt',
            color: 'white',
            margin: 'auto',
            fontFamily: 'NanumSquare',

            letterSpacing: '3px',
          }}
        >
          😀WELCOME😀
        </div>
        <div
          className='profile_img'
          style={{
            margin: 'auto',

            width: '80px',
            height: '80px',
          }}
        >
          <img
            src={require('assets/img/profile2.jpg')}
            alt='검색 버튼'
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '8%',
              border: '1px solid black',
            }}
          />
        </div>
        <div
          className='profile_name'
          style={{
            marginTop: '15px',
            fontSize: '13pt',
            color: 'white',
            fontFamily: 'NanumSquare',
            letterSpacing: '3px',
          }}
        >
          <span style={{ fontWeight: 'bold', color: 'white' }}>아무개</span>님의
          프로필
        </div>
        <div
          style={{
            marginTop: '50px',
            width: '100%',
            height: '40px',
            // backgroundColor: 'blue',
          }}
        >
          <div
            style={{
              width: 'auto',
              height: '40px',
              margin: 'auto',
              // backgroundColor: 'green',
            }}
          >
            <Button className='btn-round bg-dark' type='button' href='/review'>
              <i className='fa fa-heart mr-1' />
              평가하기
            </Button>
            {/* <MovieReviewModal modal={modal} closeModal={closeModal} /> */}
            <Button
              className='btn-round bg-dark'
              type='button'
              href='/analysis'
              style={{ margin: '0px 20px' }}
            >
              <i className='fa fa-heart mr-1' />
              취향분석
            </Button>
            <Button
              className='btn-round bg-dark'
              type='button'
              // href='/analysis'
            >
              <i className='fa fa-heart mr-1' />
              정보수정
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;

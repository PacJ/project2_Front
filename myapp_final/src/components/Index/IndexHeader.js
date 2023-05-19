import React from 'react';
import ReactPlayer from 'react-player';

// reactstrap components
import { Container } from 'reactstrap';

function IndexHeader() {
  const trailer = [
    'OGx85MetThQ&t',
    'kVdDrJXaNK4',
    'ABfQGtUEEzA',
    'yjRHZEUamCc',
    'aOb15GVFZxU',
    'giXco2jaZ_4',
    'UEM7YhJpyIk&t',
    '8MFTzMXl_Po',
    'gNJgMo14XWU',
    'FuPLLwH4lp4',
    '3xQws6Kq5-8',
    'enRm-9qF2L8=15s',
  ];

  const randomTrailer = trailer[Math.floor(Math.random() * trailer.length)];

  return (
    <>
      <div
        className='page-header section-dark'
        style={{
          backgroundImage:
            'url(' + require('assets/img/antoine-barres.jpg') + ')',
        }}
      >
        <ReactPlayer
          style={{ position: 'absolute', zIndex: 999999 }}
          url={`https://www.youtube.com/watch?v=${randomTrailer}`}
          width='70vw'
          height='70vh'
          loop={true}
          playing={true}
          playIcon={true}
          muted={true}
          controls={true}
        />
        <div className='filter' />
        <div className='content-center'>
          <Container>
            <div className='title-brand'>
              <h1 className='presentation-title'>부귀영화</h1>
              <div className='fog-low'>
                <img alt='...' src={require('assets/img/fog-low.png')} />
              </div>
              <div className='fog-low right'>
                <img alt='...' src={require('assets/img/fog-low.png')} />
              </div>
            </div>
            <h2 className='presentation-subtitle text-center'>
              영화 추천 서비스
            </h2>
          </Container>
        </div>
        <div
          className='moving-clouds'
          style={{
            backgroundImage: 'url(' + require('assets/img/clouds.png') + ')',
          }}
        />
      </div>
    </>
  );
}

export default IndexHeader;

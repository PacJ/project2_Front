import { Container } from 'reactstrap';
import '../../assets/css/genre.css';
import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from 'Apiurl';

function GenreSelect() {
  const [selectedGenre, setSelectedGenre] = useState([]);
  //내아이디
  const memberId = localStorage.getItem("member_id");
  const config = { headers: { 'Content-Type': 'application/json' } };

  // 체크박스가 선택되면 호출되는 함수
  function handleCheckboxChange(e) {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedGenre((prevSelectedGanre) => [
        ...prevSelectedGanre,
        Number(value),
      ]);
    } else {
      setSelectedGenre((prevSelectedGanre) =>
        prevSelectedGanre.filter((genre) => genre !== Number(value))
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = { memberId, selectedGenre };
    axios
      .post(`${baseUrl}/genreselect`, data, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      window.location.replace("/");
  }

  return (
    <>
      <div className='submitbar'>
        <p style={{ fontSize: '15px' }}>
          관심있는 <span style={{ fontWeight: 'bold' }}>장르</span>를 선택하세요
        </p>
      </div>

      <Container style={{ marginTop: '170px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: 'center' }}></div>
          <div
            className='genreSelect d-flex flex-row justify-content-between'
            style={{ marginTop: '100px' }}
          >
            {/* 드라마 */}
            <div className='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a1'
                name='드라마'
                value='18'
                onChange={handleCheckboxChange}
              />
              <label for='a1'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/KNPY1ZJitTeW_AiHJ7e80w.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk5UTTROelF5TmpjeU1EVXlPRFUyT0RZaWZRLmpUNThMWnp5cEVCcEV4TlNnaDlXSWxCYXZ1aXFaMmZCakhlUmRjbGIxR3c' />

                  <p className='genretype'>드라마</p>
                </div>
              </label>
            </div>
            {/* 코미디 */}
            <div className='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a2'
                name='코미디'
                value='35'
                onChange={handleCheckboxChange}
              />
              <label for='a2'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/OivZbOIO9E4s7J0E69K0gg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMMlJ4WTJwcVlXdDZOemhtYTNScE5ERjVibmN6SW4wLkFmQWNMQkV6dWpwUXEtZmtSMkFVcWJ0aU1CR1NjV1RrWHhpejJCSHR4V3c' />

                  <p className='genretype'>코미디</p>
                </div>
              </label>
            </div>
            {/* 범죄 */}
            <div className='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a3'
                name='범죄'
                value='80'
                onChange={handleCheckboxChange}
              />
              <label for='a3'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/94TcYcfqctg2Eq9CLU46Jg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMM28xYkhjemNtWTJPR0prY2pSbWRURTJZWEIzSW4wLnpzTW93M3ZPdHhPdEVOM1RRRTRwdGxxSFRHMXo4ZFFwMS1CeVFrWlNqa1E' />

                  <p className='genretype'>범죄</p>
                </div>
              </label>
            </div>
            {/* 로맨스 */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a4'
                name='로맨스'
                value='10749'
                onChange={handleCheckboxChange}
              />
              <label for='a4'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/_CyyDJ6oAgAGaLpky36uKg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMM1pvYTNkc2JXUjZOMlpqYjNkeWEyazViV1p3SW4wLjktMHBBUnZrSkYwdlRmOGNHUkJSUk94ZWZ5ZkxvTldndzkyVzZ3R2I3VEE' />

                  <p className='genretype'>로맨스</p>
                </div>
              </label>
            </div>
            {/* 액션 */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a5'
                name='액션'
                value='28'
                onChange={handleCheckboxChange}
              />
              <label for='a5'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/DRxPeA4BnZqEA_68CEAPew.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMM2QyY25WbGFIZHJPR1YyYzJsamNIWmtlR0p4SW4wLkM3YjVXaU1IZUJkNUpvUkFTb1Z3TV9SakRLbUJwM3Fqc1pUUXVncHBsMlk' />

                  <p className='genretype'>액션</p>
                </div>
              </label>
            </div>
          </div>

          <div
            className='genreSelect d-flex flex-row justify-content-between'
            style={{ marginTop: '30px' }}
          >
            {/* 스릴러 */}
            <div className='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a6'
                name='스릴러'
                value='53'
                onChange={handleCheckboxChange}
              />
              <label for='a6'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/7h8eJyzYJJpfC1bBRTEH_g.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMMmhpYm5kdE1tZGxaWEI0YzNWc2NUZHNhSE4zSW4wLjQ2dVBQbnFuc2IxU2prRDFJdUpwd0FwajhxWUVrdWpJWXNZMFhHRUsxam8' />

                  <p className='genretype'>스릴러</p>
                </div>
              </label>
            </div>
            {/* 다큐 */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a7'
                name='다큐'
                value='99'
                onChange={handleCheckboxChange}
              />
              <label for='a7'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/RWGeGvSyAxZ88e72G2tnYg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMMjVpZDI1eFoyUXhaVEUwYVRScGJXeGxhMnB1SW4wLjhIRnctUTc5YjJJTWdKektoVWwxSTlpVUlnUTJTcDJxcnZKOWZ2RDZVM2M' />

                  <p className='genretype'>다큐</p>
                </div>
              </label>
            </div>
            {/* 모험 */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a8'
                name='모험'
                value='12'
                onChange={handleCheckboxChange}
              />
              <label for='a8'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/AKKUdPHlV9rJQhAp-FlLVg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk56ZzNNall6TkRreE5URTFPVEF3TURFaWZRLmN2dUh1TFdlc1BpaktWQU5OajFrdDNCVGxmRC1rNzBzblFYMWNZdndNaWs' />

                  <p className='genretype'>모험</p>
                </div>
              </label>
            </div>
            {/* SF */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a9'
                name='SF'
                value='878'
                onChange={handleCheckboxChange}
              />
              <label for='a9'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/bw4jfVYFEl8JQKAtu6btTA.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMM2x5WVRKM1pqRmtOSFJoYkc5NU5YRXpPWFYzSW4wLmF5Wk5HNmhtejZsVF9UVU83ZXpYV015ak95UDZVdkR5ZlRNTzJKX2NVUG8' />

                  <p className='genretype'>SF</p>
                </div>
              </label>
            </div>
            {/* 애니메이션 */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a10'
                name='애니메이션'
                value='16'
                onChange={handleCheckboxChange}
              />
              <label for='a10'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/9TrYTXkmKQX3dvgcgi4sIg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk5EZzBORE14T0RJeE1qTTNNRFl3TURBaWZRLjVHa1R1Zk12c0I5RnlsWEZDSG5pMUZWdnVvQmNSSU10VVJDMFlocmRlN2s' />

                  <p className='genretype'>애니메이션</p>
                </div>
              </label>
            </div>
          </div>

          <div
            class='genreSelect d-flex flex-row justify-content-between'
            style={{ marginTop: '30px' }}
          >
            {/* 가족 */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a11'
                name='가족'
                value='10751'
                onChange={handleCheckboxChange}
              />
              <label for='a11'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/tuopnl4Z64pAEfD3MIsrhQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMMnB4Y1hReWRqWnNkVzFzZDJwaVptZzRkRGQxSW4wLnB5dks3YWJ2RlUyMFB2STFOTTE5QlBReEhTcnoxOGJRZklBYlFQc2RyVEk' />

                  <p className='genretype'>가족</p>
                </div>
              </label>
            </div>
            {/* 미스터리 */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a12'
                name='미스터리'
                value='9648'
                onChange={handleCheckboxChange}
              />
              <label for='a12'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/akrdqVRPejn3FLJABurYSg.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMM2h0YUhwMmMyNW5hREZsWW1KdmVtMXNablI1SW4wLmtuWjgtNjVYNnlhVU1nOTExOWQ2azlCNE9fWUhSM3JoUFR1SGIyU1cyTW8' />

                  <p className='genretype'>미스터리</p>
                </div>
              </label>
            </div>
            {/* 공포 */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a13'
                name='공포'
                value='27'
                onChange={handleCheckboxChange}
              />
              <label for='a13'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/58oETksTlSxk4S40eLPbeQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXlMM04wYjNKbEwybHRZV2RsTHpFMk1qSTBNelEwTURjM01EYzVNamt5TURNaWZRLkNGZXk2M21ENjk2WXYwWmFkSFhuNzJGU0VMM0QzaEpXc2RMb0RTeTRIT3c' />
                  <p className='genretype'>공포</p>
                </div>
              </label>
            </div>
            {/* 판타지 */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a14'
                name='판타지'
                value='14'
                onChange={handleCheckboxChange}
              />
              <label for='a14'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/pUxLYXDHHe3A8tZXC_2G0w.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMM2R2YzNOeU1YSjZjR1ZqWkd4dWJHTndNbVp5SW4wLjZrYmFaTFdIemVKZXVHUTU2aXF0SmNKb3N0US1YMFdhYXhDS1A0RHhyUFE' />

                  <p className='genretype'>판타지</p>
                </div>
              </label>
            </div>
            {/* 전쟁 */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a15'
                name='전쟁'
                value='10752'
                onChange={handleCheckboxChange}
              />
              <label for='a15'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/NffqP2wUKd-rci7omUip0A.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMMkp4YlRrMWJYZHZaWGhpZVRGdmRITnRkbnBpSW4wLmp1UElHQmRpQzJnRzJwbF9EZXJWbWd3RW5iZGFBYXFna201Vy15VkNGU2s' />

                  <p className='genretype'>전쟁</p>
                </div>
              </label>
            </div>
          </div>

          <div
            class='genreSelect d-flex flex-row justify-content-around'
            style={{ marginTop: '30px' }}
          >
            {/* 음악 */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a16'
                name='음악'
                value='10402'
                onChange={handleCheckboxChange}
              />
              <label for='a16'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/db1q3Zib9t6Yrti7PJceNQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMMmwwZW14aU9IcDFkWEZwYUdGd2QzcG1ZbkV5SW4wLngwOXVBZDlHcjk5Szc3TnBwNlhoUVAwWlpIeTdFaVZxOXJDa2J4dEZVWnc' />

                  <p className='genretype'>음악</p>
                </div>
              </label>
            </div>
            {/* 서부 */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a17'
                name='서부'
                value='37'
                onChange={handleCheckboxChange}
              />
              <label for='a17'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/NPlpwSxZrMaXQLKCdxTjhQ.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMM1ZoY0hjemJYbHZNbmN4ZERaelp6ZHJObkpzSW4wLnh2dFREQ0kzTWZIN3pFOV9CaXA1NkFsdTlVdHUyOFhCV0p5LU4yNlE4SU0' />
                  <p className='genretype'>서부</p>
                </div>
              </label>
            </div>
            {/* 역사 */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a18'
                name='역사'
                value='36'
                onChange={handleCheckboxChange}
              />
              <label for='a18'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/AkrHBZUaPewXxyG_-7ekpA.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMM1k0WldocmVESnZkM015ZEdsbk5YWnZZM05vSW4wLjQ3X3Y0QWRyXzVCYnI2WUN0QV9RbzZNcGtGMU1NVDJJMm9UcDZuZlJsYm8' />
                  <p className='genretype'>역사</p>
                </div>
              </label>
            </div>
            {/* TV영화 */}
            <div class='item'>
              <input
                className='checkbox'
                type='checkbox'
                id='a19'
                name='TV영화'
                value='10770'
                onChange={handleCheckboxChange}
              />
              <label for='a19'>
                <div id='drama' className='genre-set'>
                  <img src='https://an2-img.amz.wtchn.net/image/v2/pUxLYXDHHe3A8tZXC_2G0w.jpg?jwt=ZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKdmNIUnpJanBiSW1SZk5Ea3dlRGN3TUhFNE1DSmRMQ0p3SWpvaUwzWXhMM2R2YzNOeU1YSjZjR1ZqWkd4dWJHTndNbVp5SW4wLjZrYmFaTFdIemVKZXVHUTU2aXF0SmNKb3N0US1YMFdhYXhDS1A0RHhyUFE' />

                  <p className='genretype'>TV영화</p>
                </div>
              </label>
            </div>
          </div>
          <div style={{ width: '100%', height: '150px', display: 'flex' }}>
            <button
              className='btn-round'
              color='danger'
              href='/'
              onMouseOver={(e) => (e.target.style.backgroundColor = '#d43f3f')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#e75757')}
              style={{
                height: '50px',
                width: '30%',
                margin: '50px auto',
                color: 'white',
                border: 0,
                borderRadius: '5px',
                backgroundColor: '#e75757',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                textAlign: 'center',
                fontFamily: 'NanumSquare',
              }}
            >
              선택 완료
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default GenreSelect;

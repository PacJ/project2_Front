import { useEffect, useState } from 'react';
import style from '../../assets/css/analysis.module.css';
import axios from 'axios';
import { baseUrl } from 'Apiurl';
import { useParams } from 'react-router-dom';

// 사용자가 남긴 별점 개수, 분표 요약 페이지
const ReviewSummary = () => {
  const { member_id } = useParams();
  const [ratingCnt, setRatingCnt] = useState([]);

  console.log(member_id);
  const save = [...ratingCnt];

  useEffect(() => {
    axios
      .get(`${baseUrl}/analysis/${member_id}`)
      .then((response) => {
        setRatingCnt(response.data.ratingDistribution);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 백분율 구할 때, 가장 큰 숫자 기준 : 100
  // 가장 작은 숫자 : 0
  // 가장큰숫자/ 현재 * 100

  // 별점 갯수
  const ratingSum =
    save[0] +
    save[1] +
    save[2] +
    save[3] +
    save[4] +
    save[5] +
    save[6] +
    save[7] +
    save[8] +
    save[9];

  //평균평점
  const ratingAvg =
    (0.5 * save[0] +
      1 * save[1] +
      1.5 * save[2] +
      2 * save[3] +
      2.5 * save[4] +
      3 * save[5] +
      3.5 * save[6] +
      4 * save[7] +
      4.5 * save[8] +
      5 * save[9]) /
    ratingSum;

  const title = () => {
    if (isNaN(ratingAvg)) {
      return '준비중인';
    } else if (ratingAvg < 2.5) {
      return '부정적인';
    } else if (ratingAvg < 3) {
      return '중립적인';
    } else return '긍정적인';
  };

  //가장 큰 갯수
  const maxchart = Math.max(...save);
  console.log(maxchart);

  //색정하기 함수
  function backgroundColor(num) {
    if (num < maxchart) {
      return '#ffd621';
    } else if ((num = maxchart)) {
      return '#ff9b21';
    }
  }

  //백분률 리턴 함수
  function chartHeight(num) {
    return (num / maxchart) * 100;
  }

  return (
    <>
      <div style={{ margin: '10px  auto 0 auto', width: '700px' }}>
        <div className={style.box}>
          <div className={style.content}>
            <p className={style.title}>별점 분포</p>
            <div className={style.chartset}>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(save[0])}%`,
                    backgroundColor: `${backgroundColor(save[0])}`,
                    borderBottom: `2px solid ${backgroundColor(save[0])}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(save[1])}%`,
                    backgroundColor: `${backgroundColor(save[1])}`,
                    borderBottom: `2px solid ${backgroundColor(save[1])}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(save[2])}%`,
                    backgroundColor: `${backgroundColor(save[2])}`,
                    borderBottom: `2px solid ${backgroundColor(save[2])}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(save[3])}%`,
                    backgroundColor: `${backgroundColor(save[3])}`,
                    borderBottom: `2px solid ${backgroundColor(save[3])}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(save[4])}%`,
                    backgroundColor: `${backgroundColor(save[4])}`,
                    borderBottom: `2px solid ${backgroundColor(save[4])}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(save[5])}%`,
                    backgroundColor: `${backgroundColor(save[5])}`,
                    borderBottom: `2px solid ${backgroundColor(save[5])}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(save[6])}%`,
                    backgroundColor: `${backgroundColor(save[6])}`,
                    borderBottom: `2px solid ${backgroundColor(save[6])}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(save[7])}%`,
                    backgroundColor: `${backgroundColor(save[7])}`,
                    borderBottom: `2px solid ${backgroundColor(save[7])}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(save[8])}%`,
                    backgroundColor: `${backgroundColor(save[8])}`,
                    borderBottom: `2px solid ${backgroundColor(save[8])}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(save[9])}%`,
                    backgroundColor: `${backgroundColor(save[9])}`,
                    borderBottom: `2px solid ${backgroundColor(save[9])}`,
                  }}
                ></div>
              </div>
            </div>
            <div className={style.charttilte}>
              <div className={style.chartT}></div>
              <div className={style.chartT}>1</div>
              <div className={style.chartT}></div>
              <div className={style.chartT}>2</div>
              <div className={style.chartT}></div>
              <div className={style.chartT}>3</div>
              <div className={style.chartT}></div>
              <div className={style.chartT}>4</div>
              <div className={style.chartT}></div>
              <div className={style.chartT}>5</div>
            </div>

            <div className={style.text}>
              <div style={{ margin: 'auto' }}>
                <div className={style.textbox}>
                  <div className={style.top}>
                    {ratingAvg.toFixed(1) > 0 ? ratingAvg.toFixed(1) : '없음'}
                  </div>
                  <div className={style.foot}>별점평균</div>
                </div>
                <div id={style.middle} className={style.textbox}>
                  <div className={style.top}>
                    {ratingSum > 0 ? ratingSum : '없음'}
                  </div>
                  <div className={style.foot}>별점개수</div>
                </div>
                <div className={style.textbox}>
                  <div className={style.top}>{title()}</div>
                  <div className={style.foot}>평론가</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewSummary;

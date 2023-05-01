import style from '../../assets/css/analysis.module.css';

// 사용자가 남긴 별점 개수, 분표 요약 페이지
const ReviewSummary = () => {
  // 백분율 구할 때, 가장 큰 숫자 기준 : 100
  // 가장 작은 숫자 : 0
  // 가장큰숫자/ 현재 * 100

  //갯수 받아오는 변수
  const chart1 = 3;
  const chart2 = 15;
  const chart3 = 4;
  const chart4 = 1;
  const chart5 = 16;
  const chart6 = 6;
  const chart7 = 20;
  const chart8 = 3;
  const chart9 = 14;
  const chart10 = 20;

  // 색깔정하기 배열
  const chart = [
    chart1,
    chart2,
    chart3,
    chart4,
    chart5,
    chart6,
    chart7,
    chart8,
    chart9,
    chart10,
  ];

  //가장 큰 갯수
  const maxchart = Math.max(...chart);

  //색정하기 함수
  function backgroundColor(num) {
    if (num < maxchart) {
      return '#ffd621';
    } else {
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
                    height: `${chartHeight(chart1)}%`,
                    backgroundColor: `${backgroundColor(chart1)}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(chart2)}%`,
                    backgroundColor: `${backgroundColor(chart2)}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(chart3)}%`,
                    backgroundColor: `${backgroundColor(chart3)}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(chart4)}%`,
                    backgroundColor: `${backgroundColor(chart4)}`,
                    borderBottom: `2px solid ${backgroundColor(chart4)}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(chart5)}%`,
                    backgroundColor: `${backgroundColor(chart5)}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(chart6)}%`,
                    backgroundColor: `${backgroundColor(chart6)}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(chart7)}%`,
                    backgroundColor: `${backgroundColor(chart7)}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(chart8)}%`,
                    backgroundColor: `${backgroundColor(chart8)}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(chart9)}%`,
                    backgroundColor: `${backgroundColor(chart9)}`,
                  }}
                ></div>
              </div>
              <div className={style.chart}>
                <div
                  style={{
                    height: `${chartHeight(chart10)}%`,
                    backgroundColor: `${backgroundColor(chart10)}`,
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
                  {' '}
                  <div className={style.top}>4.2</div>
                  <div className={style.foot}>별점평균</div>
                </div>
                <div id={style.middle} className={style.textbox}>
                  {' '}
                  <div className={style.top}>5</div>
                  <div className={style.foot}>별점개수</div>
                </div>
                <div className={style.textbox}>
                  <div className={style.top}>긍정적인</div>
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

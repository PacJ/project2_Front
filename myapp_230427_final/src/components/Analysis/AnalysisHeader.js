import style from '../../assets/css/analysis.module.css';

const AnalysisHeader = () => {
  return (
    <div style={{ margin: '50px auto 0 auto', width: '700px' }}>
      <div className={style.profile}>
        <div className={style.maintitle}>
          <span style={{ fontWeight: 'bold' }}>아무개님</span>의 취향분석
        </div>
        <div className={style.profile_img}>
          <img
            className={style.profile_img_img}
            src={require('assets/img/profile2.jpg')}
            alt='검색 버튼'
          />
        </div>
        <div className={style.profile_name}>
          현재까지　
          <span
            style={{
              fontSize: '18px',
              textDecoration: 'underline',
              fontWeight: 'bold',
              color: 'white',
              textUnderlineOffset: '10px',
            }}
          >
            1,320개
          </span>
          　의 평가를 했습니다.
        </div>
        <div
          style={{
            width: '100%',
            height: '60px',
            // backgroundColor: 'blue',
          }}
        ></div>
      </div>
    </div>
  );
};

export default AnalysisHeader;

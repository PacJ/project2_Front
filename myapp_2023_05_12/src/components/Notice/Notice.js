import { useState } from 'react';
import style from '../../assets/css/notice.module.css';

const Notice = () => {
  const [showText, setShowText] = useState(false); // state to keep track of whether text should be shown or hidden

  const handleToggleText = () => {
    setShowText(!showText); // toggle the value of showText when noticeset is clicked
  };

  return (
    <>
      <div style={{ width: '100%', height: '188px' }}></div>
      <div style={{ margin: 'auto', width: '800px' }}>
        <p className={style.main_title}>
          부귀영화 서비스의 <span className={style.red}>신규</span> 및
          <span className={style.red}> 업데이트</span>
          소식을 알려드립니다!
        </p>

        <div className={style.main_line}></div>
        <div className={style.line}></div>
        <div className={style.notice}>
          <div className={style.notice_set} onClick={handleToggleText}>
            <div className={style.title}>부귀영화 v.0.12 업데이트 공지사항</div>
            <div className={style.date}>2023.05.02</div>
          </div>
          {showText && (
            <div className={style.text}>
              부귀영화 관리자 송세라님께서, 탈주하셨습니다.
              <br />
              모두들 즐거운 마음으로 프로젝트를 마무리 해주시길 바랍니다.
            </div>
          )}
          <div className={style.line}></div>
          <div className={style.notice_set} onClick={handleToggleText}>
            <div className={style.title}>부귀영화 v.0.12 업데이트 공지사항</div>
            <div className={style.date}>2023.05.02</div>
          </div>
          {showText && (
            <div className={style.text}>
              부귀영화 관리자 송세라님께서, 탈주하셨습니다.
              <br />
              모두들 즐거운 마음으로 프로젝트를 마무리 해주시길 바랍니다.
            </div>
          )}
          <div className={style.line}></div>
        </div>
      </div>
    </>
  );
};
export default Notice;

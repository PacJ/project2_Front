import style from '../../assets/css/analysis.module.css';

// 사용자가 남긴 별점 개수, 분표 요약 페이지
const UserGenre = () => {
  return (
    <>
      <div style={{ margin: '10px  auto 0 auto', width: '700px' }}>
        <div className={style.box2}>
          <div className={style.content}>
            <p className={style.title}>선호 장르</p>
            <div className={style.text2}>
              <div style={{ margin: 'auto' }}>
                <div className={style.textbox}>
                  <div className={style.top}>코믹</div>
                  <div className={style.foot2}>
                    95점 <span style={{ fontWeight: 'bold' }}>・</span> 31편
                  </div>
                </div>
                <div id={style.middle} className={style.textbox}>
                  <div className={style.top}>SF</div>
                  <div className={style.foot2}>
                    90점 <span>・</span> 23편
                  </div>
                </div>
                <div className={style.textbox}>
                  <div className={style.top}>드라마</div>
                  <div className={style.foot2}>
                    91점 <span>・</span> 21편
                  </div>
                </div>
              </div>
            </div>
            <div className={style.ranking}>
              <div id='rank3' className={style.rank_set}>
                <div className={style.rank_left}>공포</div>
                <div className={style.rank_right}>
                  88점 <span style={{ fontWeight: 'bold' }}>・</span> 20편
                </div>
              </div>

              <div id='rank4' className={style.rank_set}>
                <div className={style.rank_left}>다큐</div>
                <div className={style.rank_right}>
                  84점 <span style={{ fontWeight: 'bold' }}>・</span> 17편
                </div>
              </div>

              <div id='rank5' className={style.rank_set}>
                <div className={style.rank_left}>스릴러</div>
                <div className={style.rank_right}>
                  83점 <span style={{ fontWeight: 'bold' }}>・</span> 16편
                </div>
              </div>

              <div id='rank6' className={style.rank_set}>
                <div className={style.rank_left}>액션</div>
                <div className={style.rank_right}>
                  81점 <span style={{ fontWeight: 'bold' }}>・</span> 11편
                </div>
              </div>

              <div id='rank7' className={style.rank_set}>
                <div className={style.rank_left}>스포츠</div>
                <div className={style.rank_right}>
                  78점 <span style={{ fontWeight: 'bold' }}>・</span> 7편
                </div>
              </div>

              <div id='rank8' className={style.rank_set}>
                <div className={style.rank_left}>가족</div>
                <div className={style.rank_right}>
                  76점 <span style={{ fontWeight: 'bold' }}>・</span> 4편
                </div>
              </div>

              <div id='rank9' className={style.rank_set}>
                <div className={style.rank_left}>애니메이션</div>
                <div className={style.rank_right}>
                  74점 <span style={{ fontWeight: 'bold' }}>・</span> 3편
                </div>
              </div>

              <div id='rank10' className={style.rank_set}>
                <div className={style.rank_left}>모험</div>
                <div className={style.rank_right}>
                  70점 <span style={{ fontWeight: 'bold' }}>・</span> 1편
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGenre;

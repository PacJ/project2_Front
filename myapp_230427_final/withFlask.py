import cx_Oracle
import pandas as pd
import numpy as np
import re
from konlpy.tag import Okt
from sklearn.feature_extraction.text import TfidfVectorizer
from collections import defaultdict
from sklearn.metrics.pairwise import linear_kernel
from flask import Flask, request

# Okt = Okt

app = Flask(__name__)

@app.route('/recommend')
def recommend_movie():
    movie_id = request.args.get('MOVIE_ID', type=int)
#-----------------------------------------
    # 데이터베이스 연결 정보
    conn = cx_Oracle.connect('pjw/a1234@localhost:1521/xe')

    # 출력 옵션 설정
    pd.set_option('display.max_columns', None)  # 모든 열 출력
    pd.set_option('display.max_rows', None)  # 모든 행 출력

    # 연결된 데이터베이스의 버전 확인
    print(conn.version)

    # SQL 쿼리 실행
    cursor = conn.cursor()
    cursor.execute('SELECT MOVIE_ID, TITLE, OVERVIEW FROM MOVIE WHERE ROWNUM <= 2000 ORDER BY POPULARITY DESC')
    # print(cursor.description)

    # 데이터프레임으로 변환
    col_names = [row[0] for row in cursor.description]
    movieList = pd.DataFrame(cursor.fetchall(), columns=col_names)
    # print(movieList)

    # 연결 종료
    cursor.close()
    conn.close()

    #데이터전처리 작업 (null, 중복값 삭제 후 인덱스 재설정)
    movieList = movieList.dropna()
    # movieList = movieList.drop_duplicates(['title'], keep = 'first')
    movieList = movieList.reset_index(drop=True)

#-------------------------------------------
    #정규표현식
    def preprocessing(text):
        # 한글, 영문, 숫자만 남기고 모두 제거하도록 합니다.
        text = re.sub('[^가-힣ㄱ-ㅎㅏ-ㅣ0-9]', ' ', text)
        # 중복으로 생성된 공백값을 제거합니다.
        text = re.sub('[\s]+', ' ', text)
        return text

    #조사, 어미 구두점 제거 (형태소만 남기기)
    def okt_clean(text):
        clean_text = []
        test_pos = Okt().pos(text, stem=True)
        for op in test_pos :
            if op[1] not in ["Josa", "Eomi"] :
                clean_text.append(op[0])

        return " ".join(clean_text)

    # 불용어 제거
    def remove_stopwords(text):
        tokens = text.split(' ')
        stops = [ '합니다', '하는', '할', '하고', '한다', 
                '그리고', '입니다', '그', '등', '이런', '및','제', '더']
        meaningful_words = [w for w in tokens if not w in stops]
        return ' '.join(meaningful_words)


    # movieList작업
    #  - 데이터프레임 데이터 변경(형태소분리)
    for i in range(len(movieList)):
        movieList.loc[i, 'OVERVIEW'] = remove_stopwords(preprocessing(okt_clean(movieList['OVERVIEW'][i])))
        # print(movieList.loc[i])
#-----------------------------------$ FLASK_APP=<filename>.py FLASK_ENV=development flask run"
    #상관관계 분석
    #객체생성
    tfidf = TfidfVectorizer() 
    tfidf_matrix = tfidf.fit_transform(movieList['OVERVIEW'])


    #코사인유사도 linear_kernel(x축, y축)
    cosine_sim = linear_kernel(tfidf_matrix,tfidf_matrix)


    #movie_id 인덱스 값을 가져오기
    indices = pd.Series(movieList.index, index = movieList['OVERVIEW'])

    #movie_id를 입력하면 코사인 유사도를 통해 가장 유사도가 높은 상위 20개의 도서 목록 반환
    def get_recommendations(movie_id, cosine_sim=cosine_sim) :

        #movie_id 이용해 전체 데이터에서 해당 도서의 index값 찾기
        idx = indices[movie_id] 
        print(idx)
        if idx >= len(indices):
            return 'Movie Id not Found in database'
        print("get_recommendations 호출")
        #코사인 유사도 매트릭스(cosine_sim)에서 idx에 해당하는 데이터를 (idx,유사도) 형태로 출력
        sim_scores = list(enumerate(cosine_sim[idx]))

        # 유사도 내림차순 정렬
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        
        #검색도서 제외 5개의 추천 도서 슬라이싱
        sim_scores = sim_scores[1:11]

        #추천 도서 목록 10개의 인덱스 정보 추출
        movie_indices = [i[0] for i in sim_scores]

        #인덱스를 이용해 영화 ID추출 (list로 변환)
        return movieList['MOVIE_ID'].iloc[movie_indices].tolist()
    
    return get_recommendations(movie_id)
if __name__ == '__main__':
    app.run(debug=True)
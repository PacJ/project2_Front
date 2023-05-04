import cx_Oracle
import pandas as pd
import numpy as np
import re
from konlpy.tag import Okt
from sklearn.feature_extraction.text import TfidfVectorizer
from collections import defaultdict
from sklearn.metrics.pairwise import linear_kernel
from flask import Flask, request
import requests

# movie_id = request.args.get('MOVIE_ID', type=int)
#-----------------------------------------
# Load data
movieList = pd.read_csv('MOVIE.csv')
# print(movieList.head())

selected_columns = movieList.loc[:,['TITLE', 'MOVIE_ID', 'OVERVIEW', 'POPULARITY']]

# print(selected_columns.sort_values('POPULARITY', ascending=False))

top_2000_movies = selected_columns.sort_values('POPULARITY', ascending=False)[0:2000].reset_index(drop=True)
print(top_2000_movies[0:10])
# top_movies = top_2000_movies[['TITLE', 'MOVIE_ID', 'OVERVIEW']]
# print(top_movies[0:10])

#데이터전처리 작업 (null, 중복값 삭제 후 인덱스 재설정)
# movieList = movieList.dropna()
# movieList = movieList.drop_duplicates(['title'], keep = 'first')
# movieList = movieList.reset_index(drop=True)

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

print(top_2000_movies['OVERVIEW'][1])
# print(top_movies['OVERVIEW'][2])
# 불용어 제거
def remove_stopwords(text):
    tokens = text.split(' ')
    stops = [ '합니다', '하는', '할', '하고', '한다', 
            '그리고', '그러나', '입니다', '그', '등', '이런', '및','제', '더']
    meaningful_words = [w for w in tokens if not w in stops]
    return ' '.join(meaningful_words)
print(top_2000_movies.loc[2])

# movieList작업
#  - 데이터프레임 데이터 변경(형태소분리)
for i in range(len(top_2000_movies)):
    # print(i)
    top_2000_movies.loc[i, 'OVERVIEW'] = remove_stopwords(preprocessing(okt_clean(top_2000_movies['OVERVIEW'][i])))
    # print(top_movies.loc[i])
#-----------------------------------$ FLASK_APP=<filename>.py FLASK_ENV=development flask run"
# 상관관계 분석
# 객체생성
tfidf = TfidfVectorizer() 
tfidf_matrix = tfidf.fit_transform(top_2000_movies['OVERVIEW'])


#코사인유사도 linear_kernel(x축, y축)
cosine_sim = linear_kernel(tfidf_matrix,tfidf_matrix)


# #isbn의 인덱스 값을 가져오기
indices = pd.Series(top_2000_movies.index, index = top_2000_movies['OVERVIEW'])

#isbn을 입력하면 코사인 유사도를 통해 가장 유사도가 높은 상위 20개의 도서 목록 반환
def get_recommendations(movie_id, cosine_sim=cosine_sim) :
    #isbn을 이용해 전체 데이터에서 해당 도서의 index값 찾기
    idx = indices[movie_id] 
    print(idx)
    print(cosine_sim[idx])
    #코사인 유사도 매트릭스(cosine_sim)에서 idx에 해당하는 데이터를 (idx,유사도) 형태로 출력
    sim_scores = list(enumerate(cosine_sim[idx]))

    # 유사도 내림차순 정렬
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    #검색도서 제외 5개의 추천 도서 슬라이싱
    sim_scores = sim_scores[1:6]

    #추천 도서 목록 10개의 인덱스 정보 추출
    movie_indices = [i[0] for i in sim_scores]
    print("형태소분석해서 추천 알고리즘 ")

    data = top_2000_movies['MOVIE_ID'].iloc[movie_indices].to_list()
    response = requests.post('http://localhost:8090/recommend', json=data)
    print(response.status_code)
    print(response.json())
    # 인덱스를 이용해 MOVIE_ID추출 (list로 변환)
    return top_2000_movies['MOVIE_ID'].iloc[movie_indices].to_list()

get_recommendations(top_2000_movies.index[0])


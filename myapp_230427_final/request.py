import requests
import json
from flask import Flask


import pandas as pd
import numpy as np
import warnings

from sklearn.metrics.pairwise import cosine_similarity  # 코사인 유사도 산출하는 모듈
from sklearn.metrics import mean_squared_error

from sklearn.feature_extraction.text import CountVectorizer

import cx_Oracle
import pandas as pd
import numpy as np
import re
from konlpy.tag import Okt
from sklearn.feature_extraction.text import TfidfVectorizer
from collections import defaultdict
from sklearn.metrics.pairwise import linear_kernel
from flask import Flask, request

warnings.filterwarnings('ignore')
app = Flask(__name__)


def userrecommenddef(given_user):
    def predict_rating(rating_arr, item_sim_arr):
        ratings_pred = rating_arr.dot(
            item_sim_arr)/np.array([np.abs(item_sim_arr).sum(axis=1)])
        return ratings_pred

    # mse 예측평가

    def get_mse(pred, actual):
        pred = pred[actual.nonzero()].flatten()
        actual = actual[actual.nonzero()].flatten()
        return mean_squared_error(pred, actual)

    # 예측 평가

    def predict_rating_topsim(rating_arr, item_sim_arr, n=20):
        pred = np.zeros(rating_arr.shape)
        for col in range(rating_arr.shape[1]):
            top_n_items = [np.argsort(item_sim_arr[:, col])[:-n-1:-1]]
            for row in range(rating_arr.shape[0]):
                pred[row, col] = item_sim_arr[col, :][top_n_items].dot(
                    rating_arr[row, :][top_n_items].T)
                pred[row,
                     col] /= np.sum(np.abs(item_sim_arr[col, :][top_n_items]))
        return pred

    def get_unseen_movies(ratings_matrix, userId):
        user_rating = ratings_matrix.loc[userId, :]
        already_seen = user_rating[user_rating > 0].index.tolist()
        movies_list = ratings_matrix.columns.tolist()
        unseen_list = [
            movie for movie in movies_list if movie not in already_seen]
        return unseen_list

    def recomm_movie_by_user_id(pred_df, userId, unseen_list, top_n=10):
        recomm_movie_list = pred_df.loc[userId, unseen_list].sort_values(ascending=False)[
            :top_n]
        return recomm_movie_list
    # # 행렬 분해를 이용한 잠재 요인 협업 필터링 ??
    # 사용 안할 수 도 있음
    # def get_rmse(R, P, Q, non_zeros):
    #     error = 0
    #     full_pred_matrix = np.dot(P, Q.T)
    #     x_non_zero_ind = [non_zero[0] for non_zero in non_zeros]
    #     y_non_zero_ind = [non_zero[1] for non_zero in non_zeros]
    #     R_non_zero_ind = R[x_non_zero_ind, y_non_zero_ind]
    #     full_pred_matrix_non_zeros = full_pred_matrix[x_non_zero_ind,
    #                                                   y_non_zero_ind]
    #     mse = mean_squared_error(R_non_zero_ind, full_pred_matrix_non_zeros)
    #     rmse = np.sqrt(mse
    #                    )
    #     return rmse

    movies = pd.read_csv('movie_fi.csv')
    ratings = pd.read_csv('python/ratings_small7.csv')

    ratings = ratings[['userId', 'movieId', 'rating']]

    ratings_matrix = ratings.pivot_table(
        'rating', index='userId', columns='movieId')

    ratings_matrix = ratings_matrix.fillna(0)
    # movies DataFrame에서 movieId와 title 컬럼만 추출합니다.
    movie_to_idx = {
        row['movie_id']: row['title'] for idx, row in movies[['movie_id', 'title']].iterrows()
    }

    # ratings_matrix의 컬럼을 title로 변경합니다.
    # ratings_matrix.columns = [movie_to_idx.get(
    #     movie_id) for movie_id in ratings_matrix.columns]

    # print('############################################')
    # print(ratings_matrix.head(5))

    # 영화간의 유사도 산출
    # print('############################################')
    ratings_matrix_T = ratings_matrix.transpose()
    # print(ratings_matrix_T.head)

    item_sim = cosine_similarity(ratings_matrix_T, ratings_matrix_T)
    item_sim_df = pd.DataFrame(
        data=item_sim, index=ratings_matrix.columns, columns=ratings_matrix.columns)
    # 두개의 값이 같아야함
    # 영화제목을 행, 열로 유사도 분석하는 것
    # print(item_sim_df.shape)

    # print('예측 평점############################################')
    ratings_pred = predict_rating_topsim(
        ratings_matrix.values, item_sim_df.values)
    ratings_pred_matrix = pd.DataFrame(
        data=ratings_pred, index=ratings_matrix.index, columns=ratings_matrix.columns)
    # print(ratings_pred_matrix.head(5))

    # print("아이템기반 최근접 이웃 ", get_mse(ratings_pred, ratings_matrix.values))
    # 유저아이디가 9인 사용자가 평점을 준 영화들을 평점이 높은 순서대로
    # 그사람이 본 영화의 평가를 바탕으로 다른 모든 사용자가 평가한 정보를 코사인 유사도로 분석을해서
    # 9번 유저가 안본영화중에 예측평가의 점수가 가장 높은 10개를 가져와서 출력한다.
    # user_rating_id = ratings_matrix.loc[9, :]
    # user_rating_id[user_rating_id > 0].sort_values(ascending=False)[:10]
    # print(user_rating_id[user_rating_id > 0].sort_values(ascending=False)[:10])
    unseen_list = get_unseen_movies(ratings_matrix, given_user)
    recomm_movies = recomm_movie_by_user_id(
        ratings_pred_matrix, given_user, unseen_list, top_n=10)
    recomm_movies = pd.DataFrame(
        data=recomm_movies.values, index=recomm_movies.index, columns=['pred_score'])
    recomm_movies_list = recomm_movies.index
    return recomm_movies_list


def titlesimdef(given_id):

    movies = pd.read_csv('movie_fi.csv')
    ratings = pd.read_csv('python/ratings_small7.csv')

    # print('############################################')
    # print(movies.shape)  # (9978,15)    9978개의 데이터와 15개의 컬럼을 갖는 행렬로 나옴
    # print(ratings.shape)  # (100004,4)

    ratings = ratings[['userId', 'movieId', 'rating']]

    ratings_matrix = ratings.pivot_table(
        'rating', index='userId', columns='movieId')

    ratings_matrix = ratings_matrix.fillna(0)
    # # movies DataFrame에서 movieId와 title 컬럼만 추출합니다.
    # movie_to_idx = {
    #     row['movie_id']: row['title'] for idx, row in movies[['movie_id', 'title']].iterrows()
    # }

    # # ratings_matrix의 컬럼을 title로 변경합니다.
    # ratings_matrix.columns = [movie_to_idx.get(
    #     movie_id) for movie_id in ratings_matrix.columns]

    # print('############################################')
    # print(ratings_matrix.head(5))

    #  영화간의 유사도 산출
    # print('############################################')
    ratings_matrix_T = ratings_matrix.transpose()
    # print(ratings_matrix_T.head)

    item_sim = cosine_similarity(ratings_matrix_T, ratings_matrix_T)
    item_sim_df = pd.DataFrame(
        data=item_sim, index=ratings_matrix.columns, columns=ratings_matrix.columns)
    # 두개의 값이 같아야함
    # 영화제목을 행, 열로 유사도 분석하는 것
    # print(item_sim_df.shape)

    # 제목을 코사인분석해서 비슷한걸 가져오는 것
    return item_sim_df[given_id].sort_values(ascending=False)[:10].index.tolist()

#


def get_recommendations(given_id):
    def find_sim_movie_ver1(df, sorted_ind, movie_id, top_n=10):    # 코사인 유사도 산출 함수
        # df 에서 title 컬럼값이 title_name 인 df를 추출
        title_movie = df[df['movie_id'] == movie_id]

        # index 를 ndarray로 추출하고, 유사도 순으로 10개의 index 추출
        title_index = title_movie.index.values
        similar_indexes = sorted_ind[title_index, :(top_n)]

        # 추출된 데이터를 1차원으로 변환하고 해당 인덱스의 df 추출
        similar_indexes = similar_indexes.reshape(-1)
        return df.iloc[similar_indexes]

    def weighted_vote_average(record):  # 가중평균 계산 함수
        v = record['tmdb_vote_cnt']
        R = record['tmdb_vote_sum']

        return ((v/(v+m))*R)+((m/(m+v))*C)

    movies_df = pd.read_csv('movie_fi.csv', encoding='utf-8')
    genre_df = pd.read_csv(
        'merged_genre.csv', encoding='utf-8')

    genre_df['genre_dict'] = genre_df[['genre_id', 'genre_name']].apply(
        lambda x: {'id': x[0], 'name': x[1]}, axis=1)
    genre_dict_df = genre_df[['genre_id', 'genre_dict']]
    # 장르들을 하나의 리스트로 묶는다.
    genre_dict = genre_dict_df.set_index('genre_id').to_dict()['genre_dict']

    genre_df['genre_dict'] = genre_df['genre_id'].apply(
        lambda x: genre_dict.get(x))
    genre_df = genre_df.groupby(
        'movie_id')['genre_dict'].apply(list).reset_index()

    # 장르 df 와 무비 df 를 movie_id 를 기준으로 합친다.
    merged_df = pd.merge(movies_df, genre_df, on='movie_id', how='left')

    merged_df['genre_dict'] = merged_df['genre_dict'].apply(
        lambda x: [y['name'] for y in x] if isinstance(x, list) else [])

    merged_df['genres_literal'] = merged_df['genre_dict'].apply(
        lambda x: (' ').join(x))
    # gerne_dict 는 리스트기 때문에 이것을 스트링 값으로 바꿔준다.

    # CountVectorizer 학습
    # vectorizer(벡터화) 데이터를 선, 곡선 등 기하학적 모양으로 변환하는 것을 의미한다

    # 단어장에 들어갈 최소빈도(min_df), ngram(n개의 연속적인 단어 나열)의 범위
    count_vect = CountVectorizer(min_df=0, ngram_range=(1, 2))

    # 장르별 인덱스 사전
    genre_mat = count_vect.fit_transform(merged_df['genres_literal'])

    # 범위를 좁힌 CountVectorizer 학습

    # min_df: 단어장에 들어갈 최소빈도, ngram_range: 1 <= n <= 2
    count_vect2 = CountVectorizer(min_df=1, ngram_range=(1, 1))
    genre_mat2 = count_vect2.fit_transform(merged_df['genres_literal'])

    genre_sim = cosine_similarity(genre_mat, genre_mat)

    genre_sim_sorted_ind = genre_sim.argsort(
    )[:, ::-1]  # [:,::-1] 2차원 배열의 역순정렬
    genre_sim_sorted_ind[::-1]

    title_movie = merged_df[merged_df['movie_id'] == given_id]

    # 갓파더의 인덱스를 변수로 저장하고,
    title_index = title_movie.index.values

    # 코사인 유사도가 비슷한 영화의 인덱스 10개 추출
    similar_indexes = genre_sim_sorted_ind[title_index, :10]
    similar_indexes = similar_indexes.reshape(-1)
    # 1차원 array로 변경
    merged_df.iloc[similar_indexes].head(1)

    C = merged_df['tmdb_vote_sum'].mean()
    m = merged_df['tmdb_vote_cnt'].quantile(0.6)
    # print('C:', round(C, 3), 'm:', round(m, 3))

    #####################################################################
    # 가중치 추가
    merged_df['weighted_vote'] = merged_df.apply(weighted_vote_average, axis=1)

    merged_df[['weighted_vote', 'title', 'tmdb_vote_sum', 'tmdb_vote_cnt',
               'genre_dict']].sort_values('weighted_vote', ascending=False)[:10]
    # print('가중치 반영한 merged_df========================================================')
    # print(merged_df[['weighted_vote', 'title', 'vote_average', 'vote_count',
    #                  'genre_dict']].sort_values('weighted_vote', ascending=False)[:10])

    #####################################################################
    similar_movies = find_sim_movie_ver1(
        merged_df, genre_sim_sorted_ind, given_id, 20)   # 입력할 영화
    similar_movies[['title', 'tmdb_vote_sum', 'genre_dict', 'tmdb_vote_cnt']
                   ].head(1)
    # print('similar========================================================')
    # print(similar_movies['title'])
    # print(similar_movies)
    # print(similar_movies['weighted_vote'])
    # print(list(similar_movies.sort_values(
    #     'weighted_vote', ascending=False)[:10]['title'])
    # )
    return similar_movies.sort_values(
        'weighted_vote', ascending=False)[:10]


@app.route('/abc/<int:user_id>/<array>')
def recommend(user_id, array):
    print("array")
    print(array)
    watchedlist = list(map(int, array.strip('[]').split(', ')))
    print("watch")
    print(watchedlist)
    df_list = []
    titlesim_list = []
    for i in watchedlist:
        recommendations = get_recommendations(i)
        titlesim = titlesimdef(i)
        titlesim_list = titlesim_list+titlesim
        df_list.append(recommendations)

    merged_df = pd.concat(df_list, ignore_index=True)

    recommend_df = merged_df.sort_values("weighted_vote", ascending=False)
    new_recommend_df = recommend_df.drop_duplicates(
        subset=['movie_id'], keep='first')[0:10]

    recommend_json = new_recommend_df['movie_id'].to_list()
    print(recommend_json)
    values_only_title = list(set(titlesim_list))
    user_rec_list = userrecommenddef(user_id).tolist()
    return_data = {"recommendbygenre": recommend_json,
                   "titlesim": values_only_title, "userrecommend": user_rec_list}

    return return_data


@app.route('/recommend')
def recommend_movie():
    movie_id = request.args.get('MOVIE_ID', type=int)
# -----------------------------------------
    # 데이터베이스 연결 정보
    conn = cx_Oracle.connect('pjw/a1234@localhost:1521/xe')

    # 출력 옵션 설정
    pd.set_option('display.max_columns', None)  # 모든 열 출력
    pd.set_option('display.max_rows', None)  # 모든 행 출력

    # 연결된 데이터베이스의 버전 확인
    print(conn.version)

    # SQL 쿼리 실행
    cursor = conn.cursor()
    cursor.execute(
        'SELECT MOVIE_ID, TITLE, OVERVIEW FROM MOVIE WHERE ROWNUM <= 2000 ORDER BY POPULARITY DESC')
    # print(cursor.description)

    # 데이터프레임으로 변환
    col_names = [row[0] for row in cursor.description]
    movieList = pd.DataFrame(cursor.fetchall(), columns=col_names)
    # print(movieList)

    # 연결 종료
    cursor.close()
    conn.close()

    # 데이터전처리 작업 (null, 중복값 삭제 후 인덱스 재설정)
    movieList = movieList.dropna()
    # movieList = movieList.drop_duplicates(['title'], keep = 'first')
    movieList = movieList.reset_index(drop=True)

# -------------------------------------------
    # 정규표현식
    def preprocessing(text):
        # 한글, 영문, 숫자만 남기고 모두 제거하도록 합니다.
        text = re.sub('[^가-힣ㄱ-ㅎㅏ-ㅣ0-9]', ' ', text)
        # 중복으로 생성된 공백값을 제거합니다.
        text = re.sub('[\s]+', ' ', text)
        return text

    # 조사, 어미 구두점 제거 (형태소만 남기기)
    def okt_clean(text):
        clean_text = []
        test_pos = Okt().pos(text, stem=True)
        for op in test_pos:
            if op[1] not in ["Josa", "Eomi"]:
                clean_text.append(op[0])

        return " ".join(clean_text)

    # 불용어 제거
    def remove_stopwords(text):
        tokens = text.split(' ')
        stops = ['합니다', '하는', '할', '하고', '한다',
                 '그리고', '입니다', '그', '등', '이런', '및', '제', '더']
        meaningful_words = [w for w in tokens if not w in stops]
        return ' '.join(meaningful_words)

    # movieList작업
    #  - 데이터프레임 데이터 변경(형태소분리)
    for i in range(len(movieList)):
        movieList.loc[i, 'OVERVIEW'] = remove_stopwords(
            preprocessing(okt_clean(movieList['OVERVIEW'][i])))
        # print(movieList.loc[i])
# -----------------------------------$ FLASK_APP=<filename>.py FLASK_ENV=development flask run"
    # 상관관계 분석
    # 객체생성
    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(movieList['OVERVIEW'])

    # 코사인유사도 linear_kernel(x축, y축)
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

    # isbn의 인덱스 값을 가져오기
    indices = pd.Series(movieList.index, index=movieList['OVERVIEW'])

    # isbn을 입력하면 코사인 유사도를 통해 가장 유사도가 높은 상위 20개의 도서 목록 반환
    def get_recommendations(movie_id, cosine_sim=cosine_sim):

        # isbn을 이용해 전체 데이터에서 해당 도서의 index값 찾기
        idx = indices[movie_id]
        print(idx)
        if idx >= len(indices):
            return 'Movie Id not Found in database'
        print("get_recommendations 호출")
        # 코사인 유사도 매트릭스(cosine_sim)에서 idx에 해당하는 데이터를 (idx,유사도) 형태로 출력
        sim_scores = list(enumerate(cosine_sim[idx]))

        # 유사도 내림차순 정렬
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # 검색도서 제외 5개의 추천 도서 슬라이싱
        sim_scores = sim_scores[1:11]

        # 추천 도서 목록 10개의 인덱스 정보 추출
        movie_indices = [i[0] for i in sim_scores]

        # 인덱스를 이용해 영화 ID추출 (list로 변환)
        return movieList['MOVIE_ID'].iloc[movie_indices].tolist()

    return get_recommendations(movie_id)


if __name__ == '__main__':
    app.run(debug=True)

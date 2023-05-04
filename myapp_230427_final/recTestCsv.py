import cx_Oracle
import pandas as pd
import numpy as np
import re
from konlpy.tag import Okt
from sklearn.feature_extraction.text import TfidfVectorizer
from collections import defaultdict
from sklearn.metrics.pairwise import linear_kernel
from flask import Flask, request

app = Flask(__name__)

# Load data
movieList = pd.read_csv('MOVIE.csv')
movieList = movieList.dropna()
movieList = movieList.drop_duplicates(['title'], keep='first')
movieList = movieList.reset_index(drop=True)

# Data preprocessing
def preprocessing(text):
    text = re.sub('[^가-힣ㄱ-ㅎㅏ-ㅣ0-9]', ' ', text)
    text = re.sub('[\s]+', ' ', text)
    return text

def okt_clean(text):
    clean_text = []
    test_pos = Okt().pos(text, stem=True)
    for op in test_pos:
        if op[1] not in ["Josa", "Eomi"]:
            clean_text.append(op[0])
    return " ".join(clean_text)

def remove_stopwords(text):
    tokens = text.split(' ')
    stops = ['합니다', '하는', '할', '하고', '한다', '그리고', '입니다', '그', '등', '이런', '및', '제', '더']
    meaningful_words = [w for w in tokens if not w in stops]
    return ' '.join(meaningful_words)

for i in range(1, len(movieList)):
    movieList.loc[i, 'OVERVIEW'] = remove_stopwords(preprocessing(okt_clean(movieList['OVERVIEW'][i])))

# Create indices dictionary
indices = pd.Series(movieList.index, index=movieList['TITLE'])

# Create tf-idf matrix
tfidf = TfidfVectorizer()
tfidf_matrix = tfidf.fit_transform(movieList['OVERVIEW'])

# Calculate cosine similarity matrix
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

@app.route('/recommend')
def recommend_movie():
    movie_title = request.args.get('MOVIE_TITLE')
    try:
        # Get the index of the movie that matches the title
        idx = indices[movie_title]

        # Get the pairwsie similarity scores of all movies with that movie
        sim_scores = list(enumerate(cosine_sim[idx]))

        # Sort the movies based on the similarity scores
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # Get the scores of the 10 most similar movies
        sim_scores = sim_scores[1:11]

        # Get the movie indices
        movie_indices = [i[0] for i in sim_scores]

        # Return the top 10 most similar movies
        return movieList['TITLE'].iloc[movie_indices].to_json()
    except KeyError:
        return 'Movie not found'

if __name__ == '__main__':
    app.run(debug=True)

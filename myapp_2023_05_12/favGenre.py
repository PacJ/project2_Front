# Define the counts and averages for each genre made by the user
user_genre_counts = {'action': 10, 'comedy': 5, 'drama': 7}
user_genre_averages = {'action': 4.5, 'comedy': 3.8, 'drama': 4.0}

# Calculate the preference score for each genre
genre_scores = {}
for genre, count in user_genre_counts.items():
    if genre in user_genre_averages:
        genre_scores[genre] = count * user_genre_averages[genre]

print(genre_scores)

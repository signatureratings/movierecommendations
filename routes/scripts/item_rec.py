
import pandas as pd
import sys

users_movie_ratings = pd.read_csv('users_movie_ratings.csv')
users_movie_ratings.index = users_movie_ratings['userId']
users_movie_ratings.drop('userId',axis=1,inplace = True)

movie_similarities = pd.read_csv('movie_similarities.csv')
movie_similarities.index = movie_similarities['movieId']
movie_similarities.drop('movieId',axis=1,inplace = True)

df = pd.read_csv('df.csv')
df.index = df['movieId']
df.drop('movieId.1',axis=1,inplace = True)


# In[5]:


movies_df = pd.read_csv('movie_index.csv')
movies_df.index = movies_df['movieId']
movies_df.drop('movieId.1',axis=1,inplace = True)


# In[6]:


list = []
for each_user in users_movie_ratings.index:
    list.append(sum(users_movie_ratings.loc[each_user]>0))
data = pd.Series(list)
list.sort()



def set_of_items(id,count):
    l=[]
    for each in range(count):
        l.append(users_movie_ratings.loc[id].sort_values(ascending = False).reset_index()['index'][:count][each])
    movies_list = []
    for each_id in l:
        list=[]
        list.append(df.loc[int(each_id),'rating'])
        list.append(each_id)
        movies_list.append(list)
    movies_list.sort(reverse = True)
    final = []
    for i in range(4):
        x = movies_list[i][1]
        y = movie_similarities.loc[int(x)].sort_values(ascending = False).reset_index().iloc[1,0]
        final.append(y)
    print(final)


def itembased_cf(user_id):
    if user_id < 866:
        count = data[user_id-1]
        if count <=4 :
            final = []
            for each in range(count):
                x = users_movie_ratings.loc[user_id].sort_values(ascending = False).reset_index().iloc[each,0]
                y = movie_similarities.loc[int(x)].sort_values(ascending = False).reset_index().iloc[1,0]
                final.append(y)
            print(final)
        elif count<=29 :
            set_of_items(user_id,count)
        else:
            set_of_items(user_id,29)
    elif user_id > 866:
        count = data[user_id-2]
        if count <=4 :
            final = []
            for each in range(count):
                x = users_movie_ratings.loc[user_id].sort_values(ascending = False).reset_index().iloc[each,0]
                y = movie_similarities.loc[int(x)].sort_values(ascending = False).reset_index().iloc[1,0]
                final.append(y)
            print(final)
        elif count<=29 :
            set_of_items(user_id,count)
        else:
            set_of_items(user_id,29)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        exit(1)
    user_id = sys.argv[1]
    print(sys.argv)
    #itembased_cf(user_id)



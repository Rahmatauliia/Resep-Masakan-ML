import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from sklearn.metrics.pairwise import cosine_distances
import json

class RecommenderSystemDataSql:
    def __init__(self, dataFrame, content_col):
        self.df = dataFrame
        self.content_col = content_col
        self.encoder = None
        self.bank = None
    
    def fit(self):
        self.encoder = CountVectorizer(stop_words=stopwords.words('indonesian'), tokenizer=word_tokenize, token_pattern=None)
        self.bank = self.encoder.fit_transform(self.df[self.content_col])
        return self
        
    def recommend(self, content, limit=0):
        code = self.encoder.transform([content])
        dist = cosine_distances(code, self.bank)
        rec_idx = dist.argsort()[0, 0:limit+1 if limit > 0 else len(self.df)+1]
        result = self.df.loc[rec_idx].to_dict('records')
        data = []
        for product in result:
            # images = json.loads(f"[{product['image']}]")
            # formatted_images = []
            # for image in images:
            #     formatted_image = {
            #         'id': image['id'],
            #         'image_path': f"/images/product/{product['id']}/{image['image_path']}"
            #     }
            #     formatted_images.append(formatted_image)
            data.append({
                'id': product['id'],
                'nama': product['nama'],
                'slug': product['slug'],
                'bahan': product['bahan'],
                'langkah': product['langkah'],
                'kategori': product['kategori'],
                'daerah': product['daerah'],
                'gambar' : product['gambar'],
                'metadata': product['metadata'],
                'jumlah_favorit': product['jumlah_favorite']
            })
        return data
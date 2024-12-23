from app import response
from flask import request
from app.connection import connection
import pandas as pd
from config import Config
from app.utils.RecommenderSystem import RecommenderSystemDataSql


def index():
    user_id = request.args.get('usr')
    try:
        with connection.cursor() as cursor:
            # MENCARI SEMUA PRODUK
            sql = """
                    SELECT r.id, r.nama, r.slug, r.bahan, r.langkah, r.gambar, d.nama AS daerah, k.nama AS kategori,
                    (SELECT COUNT(*) FROM favorits f WHERE f.id_resep = r.id) AS jumlah_favorite
                    FROM reseps r
                    INNER JOIN daerahs d ON r.id_daerah = d.id
                    INNER JOIN kategoris k ON r.id_kategori = k.id
                    ;"""
            # sql = "SELECT reseps.id, reseps.nama, reseps.slug, reseps.bahan, reseps.langkah, reseps.gambar, daerahs.nama AS daerah, kategoris.nama AS kategori FROM reseps INNER JOIN daerahs ON reseps.id_daerah = daerahs.id INNER JOIN kategoris ON reseps.id_kategori = kategoris.id;"
            # MENCARI SEMUA PRODUK BERDASARKAN USER ID
            # sql2 = '''
            #         SELECT ua.id_user, ua.id_resep, r.nama AS nama_resep, r.bahan, 
            #             d.nama AS nama_daerah, k.nama AS nama_kategori, ua.created_at, ua.updated_at
            #         FROM user_activities ua
            #         INNER JOIN reseps r ON ua.id_resep = r.id
            #         INNER JOIN daerahs d ON r.id_daerah = d.id
            #         INNER JOIN kategoris k ON r.id_kategori = k.id
            #         WHERE ua.id_user = %(user_id)s
            #         ORDER BY ua.created_at DESC
            #     '''
            sql2 = '''
                    SELECT ua.id_user, ua.id_resep, r.nama AS nama_resep, r.bahan, 
                d.nama AS nama_daerah, k.nama AS nama_kategori, ua.created_at, ua.updated_at,
               (SELECT COUNT(*) FROM favorits f WHERE f.id_resep = ua.id_resep AND f.id_user = %(user_id)s) AS jumlah_favorite
                    FROM favorits ua
                    INNER JOIN reseps r ON ua.id_resep = r.id
                    INNER JOIN daerahs d ON r.id_daerah = d.id
                    INNER JOIN kategoris k ON r.id_kategori = k.id
                    WHERE ua.id_user = %(user_id)s
                    ORDER BY ua.created_at DESC
                '''
            
            # MENGAMBIL DATA DAN MEMBUAT DATAFRAME MENGGUNAKAN PANDAS
            df = pd.read_sql(sql, Config.SQLALCHEMY_DATABASE_URI)
            df2 = pd.read_sql(sql2, Config.SQLALCHEMY_DATABASE_URI, params={'user_id': user_id})
            
            # MENGGABUNGKAN SELURUH ROW DAN MENYIMPANNYA KE KOLOM METADATA
            df['metadata'] = df.apply(lambda row: f"{row['nama']} {row['daerah']} kategori {row['kategori']}", axis=1)
            df2['metadata'] = df2.apply(lambda row: f"{row['nama_resep']} {row['nama_daerah']} kategori {row['nama_kategori']}", axis=1)
            
            # MENGGABUNGKAN SEMUA HASIL DAN MENYIMPANNYA KE DALAM VARIABEL
            result_string = ' '.join(df2['metadata'])
            
            # INITIALISASI CLASS RECOMMENDER SYSTEM
            recsys = RecommenderSystemDataSql(df, 'metadata')
            # PROSES ENCODING
            recsys.fit()
            # HASIL REKOMENDASI
            data = recsys.recommend(result_string)
           
            return response.success(data)
    except Exception as e:
        print(e)
        return response.bad_request(str(e))

# def show(id):
#     # MENCARI SEMUA PRODUK
#     sql = "SELECT products.id, products.name, products.slug, products.description, products.`condition`, products.price, products.stock, tokos.name AS toko_name, tokos.slug AS toko_slug, categories.name AS category_name,  GROUP_CONCAT(JSON_OBJECT('id', product_images.id, 'image_path', product_images.image_path) SEPARATOR ',') AS image FROM products INNER JOIN product_images ON products.id = product_images.product_id INNER JOIN tokos ON products.toko_id = tokos.id INNER JOIN categories ON products.category_id = categories.id GROUP BY products.id;"
#     sql2 = "SELECT products.id, products.name, products.slug, products.description, products.`condition`, products.price, products.stock, tokos.name AS toko_name, tokos.slug AS toko_slug, categories.name AS category_name,  GROUP_CONCAT(JSON_OBJECT('id', product_images.id, 'image_path', product_images.image_path) SEPARATOR ',') AS image FROM products INNER JOIN product_images ON products.id = product_images.product_id INNER JOIN tokos ON products.toko_id = tokos.id INNER JOIN categories ON products.category_id = categories.id WHERE products.id = '{}' GROUP BY products.id;".format(id)
    
#     # MENGAMBIL DATA DAN MEMBUAT DATAFRAME MENGGUNAKAN PANDAS
#     df = pd.read_sql(sql, Config.SQLALCHEMY_DATABASE_URI)
#     df2 = pd.read_sql(sql2, Config.SQLALCHEMY_DATABASE_URI)
    
#     # MENGGABUNGKAN SELURUH ROW DAN MENYIMPANNYA KE KOLOM METADATA
#     df['metadata'] = df.apply(lambda row: f"{row['name']} {row['description']} kondisi {row['condition']} {row['toko_name']} kategori {row['category_name']}", axis=1)
#     df2['metadata'] = df2.apply(lambda row: f"{row['name']} {row['description']} kondisi {row['condition']} {row['toko_name']} kategori {row['category_name']}", axis=1)
    
#     # INITIALISASI CLASS RECOMMENDER SYSTEM
#     recsys = RecommenderSystemDataSql(df, 'metadata')
#     # PROSES ENCODING
#     recsys.fit()
#     # HASIL REKOMENDASI
#     data = recsys.recommend(df2['metadata'][0])

#     return response.success(data)
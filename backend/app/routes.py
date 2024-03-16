from app import app
from flask import render_template, redirect, url_for
from flask import request, jsonify
import os
import boto3
import time
from botocore.exceptions import ClientError
import secrets
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from dotenv import load_dotenv

load_dotenv()


# Configure db
DATABASE_URL = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL # połączenie z db
app.config['SECRET_KEY'] = secrets.token_hex(16) # klucz do szyfrowania sesji
db = SQLAlchemy(app) #obiekt bd


# Zdefiniuj modele
class Points(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cords = db.Column(db.String(100))

class Reports(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    pointid = db.Column(db.Integer, db.ForeignKey('points.id'))
    user_id = db.Column(db.Integer)

class PointDetails(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Korzystamy z tego samego ID co tabela 'Points'
    pointid = db.Column(db.Integer, db.ForeignKey('points.id'))
    description = db.Column(db.String(100))
    photo = db.Column(db.String(100))
    category = db.Column(db.String(100))
    reportsNumber = db.Column(db.Integer)
    CreatedDate = db.Column(db.DateTime)

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey('reports.user_id'))
    mail = db.Column(db.String(100))


bucket_name = os.getenv('S3_BUCKET_NAME')
bucket_region = os.getenv('S3_BUCKET_REGION')
access_key = os.getenv('S3_ACCESS_KEY')
secret_access_key = os.getenv('S3_SECRET_ACCESS_KEY')

with app.app_context():
    # Teraz możesz wywoływać operacje bazodanowe
    db.create_all()


s3 = boto3.client(
    "s3",
    aws_access_key_id=access_key,
    aws_secret_access_key=secret_access_key,
    region_name=bucket_region
)



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload_file', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    file_content = file.stream.read()
    with open("sdf.jpg", "wb") as f:
        f.write(file_content)

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        file_extension = file.filename.split('.')[-1]
        file_name = str(int(time.time())) + '.' + file_extension
        with open("cos.jpg", "wb") as f:
            f.write(file_content)
 
        with open("cos.jpg", "rb") as f:
            s3.upload_fileobj(
                Fileobj=f,
                Bucket=bucket_name,
                Key=file_name,
                ExtraArgs={
                    'ACL': 'public-read',
                    'ContentType': file.content_type
                }
            )

        # Generowanie linku do pobrania z S3
        file_url = f"https://{bucket_name}.s3.{bucket_region}.amazonaws.com/{file_name}"

        return jsonify({'link': file_url})
    
    except ClientError as e:
        return jsonify({'error': str(e)})
    

@app.route('/add-new-report', methods=['POST'])
def add_report():
    mail = request.form['mail']
    localization = request.form['localization']
    link_photo = request.form['link']
    category = request.form['category']
    description = request.form['description']
    date = request.form['date']
    new_point = Points(cords=localization)
    exist = Users.query.filter_by(mail=mail).first()
    if exist is None:
        new_user = Users(mail=mail)
        db.session.add(new_user)
        db.session.commit()
        user_id = new_user.id
    else:
        user_id = exist.id
    new_report = Reports(pointid=new_point.id, user_id=user_id)
    new_point_details = PointDetails(pointid=new_point.id, description=description, photo=link_photo, category=category, reportsNumber=1, CreatedDate=date)
    db.session.add(new_point)
    db.session.add(new_report)
    db.session.add(new_point_details)
    return jsonify({'status': 'success'})
    





    

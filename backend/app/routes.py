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
import datetime
from flask_mail import Mail, Message


load_dotenv()


# Configure db
DATABASE_URL = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL # połączenie z db
app.config['SECRET_KEY'] = secrets.token_hex(16) # klucz do szyfrowania sesji
db = SQLAlchemy(app) #obiekt bd
mail = Mail(app)
app.config.from_pyfile('config.py')


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
    district = db.Column(db.String(100))
    photo = db.Column(db.String(100))
    category = db.Column(db.String(100))
    reportsNumber = db.Column(db.Integer)
    CreatedDate = db.Column(db.String(100))
    ClosedDate = db.Column(db.DateTime)

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
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
    return "{ \"message\": \"Hello, World!\" }"

@app.route('/upload_file', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    file_content = file.stream.read()

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
    try:
        print(request.data)
        data_json = request.get_json()
        #request.data is a  json
        mail = data_json['mail']
        localization = data_json['localization']
        link_photo = data_json['link']
        category = data_json['category']
        description = data_json['description']
        date = data_json['date']
        district = data_json['district']
        print(mail, localization, link_photo, category, description, date, district)
        new_point = Points(cords=localization)
        db.session.add(new_point)
        db.session.commit()
        exist = Users.query.filter_by(mail=mail).first()
        if exist is None:
            new_user = Users(mail=mail)
            db.session.add(new_user)
            db.session.commit()
            user_id = new_user.id
        else:
            user_id = exist.id
        new_report = Reports(pointid=new_point.id, user_id=user_id)
        new_point_details = PointDetails(pointid=new_point.id, description=description, district=district, photo=link_photo, category=category, reportsNumber=1, CreatedDate=date, ClosedDate=None)
        db.session.add(new_report)
        db.session.add(new_point_details)
        db.session.commit()
        return jsonify({'status': 'success'})
    except Exception as e:
        print("An error occurred")
        print(e)
    '''
    mail = request.form['mail']
    localization = request.form['localization']
    link_photo = request.form['link']
    category = request.form['category']
    description = request.form['description']
    date = request.form['date']
    district = request.form['district']
    print(mail, localization, link_photo, category, description, date, district)
    new_point = Points(cords=localization)
    db.session.add(new_point)
    db.session.commit()
    exist = Users.query.filter_by(mail=mail).first()
    if exist is None:
        new_user = Users(mail=mail)
        db.session.add(new_user)
        db.session.commit()
        user_id = new_user.id
    else:
        user_id = exist.id
    new_report = Reports(pointid=new_point.id, user_id=user_id)
    new_point_details = PointDetails(pointid=new_point.id, description=description, district=district, photo=link_photo, category=category, reportsNumber=1, CreatedDate=date, ClosedDate=None)
    db.session.add(new_report)
    db.session.add(new_point_details)
    db.session.commit()
    return jsonify({'status': 'success'})
    '''
    
@app.route('/return-points', methods=['GET'])
def return_points():
    points = Points.query.all()
    points_list = []
    for point in points:
        point_details = PointDetails.query.filter_by(pointid=point.id).first()
        point_info = {
            'id': point.id,
            'cords': point.cords,
            'description': point_details.description,
            'district': point_details.district,
            'photo': point_details.photo,
            'category': point_details.category,
            'reportsNumber': point_details.reportsNumber,
            'CreatedDate': point_details.CreatedDate,
            'ClosedDate': point_details.ClosedDate
        }
        points_list.append(point_info)
    return jsonify(points_list)

@app.route('/add-existing-report', methods=['POST'])
def add_existing_report():
    id = request.form['id']
    exist = PointDetails.query.filter_by(pointid=id).first()
    exist.reportsNumber += 1
    db.session.commit()
    return jsonify({'status': 'success'})

@app.route('/close-report', methods=['POST'])
def close_report():
    id = request.form['id']
    exist = PointDetails.query.filter_by(pointid=id).first()
    exist.ClosedDate = datetime.now()
    db.session.commit()
    return jsonify({'status': 'success'})






    

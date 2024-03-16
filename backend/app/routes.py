from app import app
from flask import render_template, redirect, url_for
from flask import Flask, request, jsonify
import os
import boto3
import time
from botocore.exceptions import ClientError

bucket_name = os.getenv('S3_BUCKET_NAME')
bucket_region = os.getenv('S3_BUCKET_REGION')
access_key = os.getenv('S3_ACCESS_KEY')
secret_access_key = os.getenv('S3_SECRET_ACCESS_KEY')

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
    

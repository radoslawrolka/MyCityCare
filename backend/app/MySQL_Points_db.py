from app import app
from flask import request, jsonify
from flask_mysqldb import MySQL
import requests
import json

# Request all points in the given rectangle from MySQL database
def db_get_points(rect_area):
    # Sending a request to the MySQL database

    return jsonify({'success': True, 'borders': rect_area['points']})

# Validate JSON data
def validate_json(data):
    if 'points' in data:
        if isinstance(data['points'], list):
            for point in data['points']:
                if 'x' not in point or 'y' not in point:
                    return False
            return True
    return False

# Receive JSON data from the frontend
# JSON : {"points": [{"x": x1, "y": y1},
#                    {"x": x2, "y": y2},
#                    {"x": x3, "y": y3},
#                    {"x": x4, "y": y4}]
#        }
# Request all points in the given rectangle
@app.route('/get-points-in-range', methods=['GET'])
def get_points_in_range():
    # Extracting 'rect' parameter from request.args
    rect = request.args.get('rect')
    if rect:
        try:
            rect_area = json.loads(rect)
            if validate_json(rect_area):
                return db_get_points(rect_area)
            return jsonify({'success': False, 'error': 'Invalid JSON data'}), 400
        except json.JSONDecodeError as e:
            return jsonify({'success': False, 'error': 'Invalid JSON data', 'details': str(e)}), 400
    else:
        return jsonify({'success': False, 'error': 'No data provided'}), 400


@app.route('/add-point', methods=['POST'])
def add_point():
    if request.method == 'POST':
        try:
            data = request.json
            p = data['position']
            if isinstance(p, list) and len(p) == 2:
                cursor = app.config['mysql'].cursor()
                cursor.execute("INSERT INTO Points (Coords) VALUES (POINT(%s, %s))", p)
                app.config['mysql'].commit()
                return jsonify({'message': 'Point added successfully'}), 201
            else:
                return jsonify({'message': 'Invalid data'}), 400
        except Exception as e:
            return jsonify({'message': 'Invalid data', 'details': str(e)}), 400


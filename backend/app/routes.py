from flask import Blueprint, request, jsonify
from . import db
from .models import Task, Comment

api = Blueprint("api", __name__)

@api.route('/')
def home():
    return jsonify({"message": "Welcome to Flask CRUD API"}), 200

@api.route('/api/tasks', methods=['GET'])
def list_tasks():
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    return jsonify([t.to_dict() for t in tasks]), 200

@api.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.get_json() or {}
    title = data.get('title')
    description = data.get('description')
    if not title:
        return jsonify({'error': 'title required'}), 400
    t = Task(title=title, description=description)
    db.session.add(t)
    db.session.commit()
    return jsonify(t.to_dict()), 201

# @api.route('/api/tasks/<int:task_id>', methods=['PUT'])
# def update_task(task_id):
#     t = Task.query.get_or_404(task_id)
#     data = request.get_json() or {}
#     t.title = data.get('title', t.title)
#     t.description = data.get('description', t.description)
#     db.session.commit()
#     return jsonify(t.to_dict()), 200

@api.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    t = Task.query.get_or_404(task_id)
    db.session.delete(t)
    db.session.commit()
    return jsonify({'message': 'deleted'}), 200

# --- Comment routes ---
@api.route('/api/tasks/<int:task_id>/comments', methods=['GET'])
def list_comments(task_id):
    Task.query.get_or_404(task_id)
    comments = Comment.query.filter_by(task_id=task_id).order_by(Comment.created_at.asc()).all()
    return jsonify([c.to_dict() for c in comments]), 200

@api.route('/api/tasks/<int:task_id>/comments', methods=['POST'])
def create_comment(task_id):
    Task.query.get_or_404(task_id)
    data = request.get_json() or {}
    body = data.get('body')
    author = data.get('author')
    if not body:
        return jsonify({'error': 'body required'}), 400
    c = Comment(task_id=task_id, body=body, author=author)
    db.session.add(c)
    db.session.commit()
    return jsonify(c.to_dict()), 201

@api.route('/api/comments/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    c = Comment.query.get_or_404(comment_id)
    data = request.get_json() or {}
    c.body = data.get('body', c.body)
    c.author = data.get('author', c.author)
    db.session.commit()
    return jsonify(c.to_dict()), 200

@api.route('/api/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    c = Comment.query.get_or_404(comment_id)
    db.session.delete(c)
    db.session.commit()
    return jsonify({'message': 'deleted'}), 200

# --- New route to toggle task completion ---
@api.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    t = Task.query.get_or_404(task_id)
    data = request.get_json() or {}

    # update fields
    t.title = data.get('title', t.title)
    t.description = data.get('description', t.description)

    # ✅ handle completed toggle
    if "completed" in data:
        t.completed = data["completed"]

    db.session.commit()
    return jsonify(t.to_dict()), 200



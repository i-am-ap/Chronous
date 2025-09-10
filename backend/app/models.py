# backend/app/models.py
from . import db
from datetime import datetime

class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed = db.Column(db.Boolean, default=False)  # ✅ new field

    # eager load comments so to_dict can access them without extra problems
    comments = db.relationship(
        'Comment',
        backref='task',
        cascade='all, delete-orphan',
        lazy='joined'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'created_at': self.created_at.isoformat(),
            'completed': self.completed,  # include completed status
            # include nested comments sorted by created_at asc
            'comments': [c.to_dict() for c in sorted(self.comments, key=lambda x: x.created_at)]
        }

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    body = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(128), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'task_id': self.task_id,
            'body': self.body,
            'author': self.author,
            'created_at': self.created_at.isoformat()
        }


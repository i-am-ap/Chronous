import json

def test_create_list_update_delete_comment(client):
    # create a task first
    res = client.post('/api/tasks', json={'title': 'Test Task'})
    assert res.status_code == 201
    task = res.get_json()
    task_id = task['id']


    # create a comment
    res = client.post(f'/api/tasks/{task_id}/comments', json={'body': 'Hello', 'author': 'Aryan'})
    assert res.status_code == 201
    comment = res.get_json()
    assert comment['body'] == 'Hello'


    comment_id = comment['id']


    # list comments
    res = client.get(f'/api/tasks/{task_id}/comments')
    assert res.status_code == 200
    arr = res.get_json()
    assert len(arr) == 1


    # update comment
    res = client.put(f'/api/comments/{comment_id}', json={'body': 'Hello Edited'})
    assert res.status_code == 200
    updated = res.get_json()
    assert updated['body'] == 'Hello Edited'


    # delete comment
    res = client.delete(f'/api/comments/{comment_id}')
    assert res.status_code == 200


    # list comments again
    res = client.get(f'/api/tasks/{task_id}/comments')
    arr = res.get_json()
    assert len(arr) == 0
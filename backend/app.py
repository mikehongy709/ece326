from bottle import Bottle, run, template, request, response, static_file
import json
import os
import time
from history import History
from crawler import crawler

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, '..', 'frontend')

app = Bottle()
# crawl = crawler()
history = History() 

@app.route('/query', method='GET')
def query():
    query = request.query.get('q', '')
    print(f"Received query: {query}")
    splited_query = query.split(' ')
    dic = {}
    for word in splited_query:
        history.add(word)
        if word in dic:
            dic[word] += 1
        else:
            dic[word] = 1
    
    response_data = {
        'status' : 1,
        'query' : query,
        'result' : dic,
    }
    
    json_str = json.dumps(response_data)
    response.content_type = 'application/json'
    print(json_str)
    time.sleep(1)
    return json_str
    # return "Not implemented"

@app.route('/history')
def history_search():
    response.content_type = 'application/json'
    print(str(history))
    return json.dumps(history.get_top_20())


@app.route('/')
def index():
    return static_file('index.html', root=FRONTEND_DIR)

@app.route('/<filename:path>')
def serve_static(filename):
    return static_file(filename, root=FRONTEND_DIR)

if __name__ == '__main__':
    run(app=app, host='localhost', port=8080, debug=True)

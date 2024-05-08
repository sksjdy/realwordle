from fastapi import FastAPI
from pydantic import BaseModel
# // 만들었던 파일들을 가져오는 라이브러리 실행 staticfile(html,css,javascript)
from fastapi.staticfiles import StaticFiles


app = FastAPI()

answer='JIYON'

@app.get('/answer')
def get_answer():
    return answer

# // 만들었던 파일을 가져오는 함수 link같은것
app.mount("/wordle", StaticFiles(directory="static",html=True), name="static")
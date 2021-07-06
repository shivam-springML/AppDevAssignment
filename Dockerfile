FROM python:3.8-slim

COPY . ./

WORKDIR .

RUN pip install -r requirements.txt

ENV GOOGLE_APPLICATION_CREDENTIALS=../still-chassis-302715-45312abb0019.json

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app

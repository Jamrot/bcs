FROM ubuntu:latest

COPY requirements.txt requirements.txt 

RUN apt-get update \
    # && apt-get install -y libxml-parser-perl \
    # && apt-get install -y git \
    && apt-get install -y python3.10 \
    && apt-get install -y python3-pip \
    && pip3 install -r requirements.txt \
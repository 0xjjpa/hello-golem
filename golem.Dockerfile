FROM node:alpine

WORKDIR /hello-golem/work
COPY dist .

COPY src/digits.txt .
COPY src/values.json .

VOLUME /hello-golem/work /hello-golem/output /hello-golem/resource

FROM ubuntu
RUN apt-get update && apt-get install -y imagemagick nodejs npm
WORKDIR /usr/src/
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm","start"]

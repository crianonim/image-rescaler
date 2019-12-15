FROM gcr.io/pmttr-261321/node-imagemagic
WORKDIR /usr/src/
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm","start"]

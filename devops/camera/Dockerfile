FROM google/nodejs

RUN apt-get update
RUN apt-get install fswebcam -y

RUN mkdir /opt/camera
WORKDIR /opt/camera

COPY apps/camera /opt/camera
RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]

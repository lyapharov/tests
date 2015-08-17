FROM cmfatih/phantomjs
COPY ./src src
WORKDIR /src
CMD npm install glob && npm install cloudinary && casperjs screenshot-multipages.js

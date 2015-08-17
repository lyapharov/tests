FROM cmfatih/phantomjs
COPY ./src src
WORKDIR /src
CMD casperjs screenshot-multipages.js

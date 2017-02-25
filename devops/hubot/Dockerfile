FROM google/nodejs

RUN mkdir /opt/hubot
WORKDIR /opt/hubot

RUN npm install -g hubot coffee-script yo generator-hubot

COPY apps/hubot /opt/hubot
RUN npm install

RUN useradd -ms /bin/bash node
RUN chown -R node /opt/hubot
USER node

RUN yo hubot --owner="Hubot" --name="Hubot" --description="Hubot" --adapter=slack --defaults

CMD ["./bin/hubot", "--adapter", "slack"]

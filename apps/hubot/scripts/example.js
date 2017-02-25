const fetch = require('node-fetch');
const formData = require('form-data');

module.exports = (robot) => {
  robot.hear(/look/i, (response) => {

    fetch('http://camera:3000/capture')
      .then(res => res.buffer())
      .then(buffer => {
        response.reply('Took a photo');
        response.reply('I guess there is...');

        const form = new formData();
        form.append('imageobj', buffer, {
          filename: 'photo.jpg',
          contentType: 'image/jpeg'
        });

        const requestData = {
          method: 'POST',
          body: form
        };

        fetch('http://opencpu:8004/ocpu/library/package/R/recognize/json', requestData)
          .then(res => res.json())
          .then(body => {
            response.reply(body[0].substring(10));
          });
      });
  });
};

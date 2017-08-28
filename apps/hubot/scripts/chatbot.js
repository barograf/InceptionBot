'use strict';

const fetch = require('node-fetch');
const formData = require('form-data');

const takePhoto = (photoCallback) => {
  return fetch('http://camera:3000/capture')
    .then(res => {
      if (typeof photoCallback === 'function') {
        photoCallback();
      }

      return res.buffer();
    });
};

const imageBufferToRequestData = (buffer) => {

  const form = new formData();
  form.append('imageobj', buffer, {
    filename: 'photo.jpg',
    contentType: 'image/jpeg'
  });

  return {
    method: 'POST',
    body: form
  };
};

const fetchLabels = (requestData) => {
  return fetch('http://opencpu:8004/ocpu/library/package/R/recognize/json', requestData)
    .then(res => res.json())
    .then(body => body[0].substring(10));
};

const recognize = (photoCallback) => {
  return takePhoto(photoCallback)
    .then(buffer => imageBufferToRequestData(buffer))
    .then(requestData => fetchLabels(requestData))
    .then(label => label);
};

module.exports = (robot) => {

  robot.hear(/look/i, (response) => {
    recognize(() => {
      response.reply('Took a photo. I guess there is...');
    }).then(label => {
      response.reply(label);
    });
  });

  robot.hear(/see (.*)/i, (response) => {
    recognize(() => {
      response.reply('Took a photo. Let me guess...');
    }).then(label => {
      const canSee = label.toLowerCase().includes(response.match[1].toLowerCase());
      let answer = canSee ? 'Yup' : `Nope. It was ${label}`;

      response.reply(answer);
    });
  });

  robot.hear(/drink/i, (response) => {
    recognize(() => {
      response.reply('Took a photo. Wait a second...');
    }).then(label => {
      const hasBeer = label.toLowerCase().includes('beer');
      const answer = hasBeer
        ? 'Cheers!'
        : 'http://i0.kym-cdn.com/photos/images/original/000/107/432/i_hug_that_feel.png';

      response.reply(answer);
    });
  });
};

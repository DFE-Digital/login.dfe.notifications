const EmailAdapter = require('./EmailAdapter');
const config = require('./../config')();
const aws = require('aws-sdk');
const emailUtils = require('./utils');
const logger = require('./../logger');

const addContentType = (name, body, contentTypes) => {
  const type = contentTypes.find(item => item.type.toLowerCase() === name.toLowerCase());
  if (!type) {
    return;
  }

  body[name] = {
    Data: type.content,
    Charset: 'UTF-8',
  };
};

class SESEmailAdapter extends EmailAdapter {
  constructor() {
    super();

    const awsConfig = {};
    if (config.email.params && config.email.params.accessKey) {
      awsConfig['accessKeyId'] = config.email.params.accessKey;
    }
    if (config.email.params && config.email.params.accessSecret) {
      awsConfig['secretAccessKey'] = config.email.params.accessSecret;
    }
    if (config.email.params && config.email.params.region) {
      awsConfig['region'] = config.email.params.region;
    }

    aws.config.update(awsConfig);
  }

  async send(recipient, template, data, subject) {
    const contentTypes = await emailUtils.renderEmailContent(template, data);

    return new Promise((resolve, reject) => {
      var ses = new aws.SES();

      var body = {};
      addContentType('Html', body, contentTypes);
      addContentType('Text', body, contentTypes);

      ses.sendEmail({
        Source: config.email.params.sender,
        Destination: {
          ToAddresses: [recipient],
        },
        Message: {
          Subject: {
            Data: subject,
            Charset: 'UTF-8'
          },
          Body: body
        }
      }, (err) => {
        if (err) {
          logger.error(`Error sending ses email - ${JSON.stringify(err)}`);
          reject(err);
        } else {
          logger.info(`Sent ses email to ${recipient}`);
          resolve();
        }
      })
    });
  }
}

module.exports = SESEmailAdapter;

const EmailAdapter = require('./EmailAdapter');
const config = require('./../config')();
const aws = require('aws-sdk');
const emailUtils = require('./utils');
const logger = require('./../logger');

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

  async send(recipient, template, data) {
    return new Promise((resolve, reject) => {
      var ses = new aws.SES();
      const content = emailUtils.getFileContent(recipient, template, data);
      ses.sendEmail({
        Source: config.email.params.sender,
        Destination: {
          ToAddresses: [recipient],
        },
        Message: {
          Subject: {
            'Data': 'Test email sent using the AWS SES',
            'Charset': 'UTF-8'
          },
          Body: {
            Text: {
              Data: content,
              Charset: 'UTF-8'
            },
            Html: {
              Data: content,
              Charset: 'UTF-8'
            }
          }
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

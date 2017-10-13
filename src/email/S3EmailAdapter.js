const EmailAdapter = require('./EmailAdapter');
const config = require('./../config')();
const aws = require('aws-sdk');
const emailUtils = require('./utils');

class S3EmailAdapter extends EmailAdapter {
  constructor() {
    super();

    if (config.email.params && config.email.params.accessKey && config.email.params.accessSecret) {
      aws.config.update({
        accessKeyId: config.email.params.accessKey,
        secretAccessKey: config.email.params.accessSecret
      });
    }
  }

  async send(recipient, template, data) {
    return new Promise((resolve, reject) => {
      const fileName = emailUtils.makeFileName();
      const content = emailUtils.getFileContent(recipient, template, data);
      const object = {
        Bucket: config.email.params.bucketName,
        Key: `notifications/email/${template}/${fileName}`,
        Body: content
      };

      const s3 = new aws.S3();
      s3.putObject(object, (err) => {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

  }
}

module.exports = S3EmailAdapter;
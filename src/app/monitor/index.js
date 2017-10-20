const logger = require('./../../infrastructure/logger');
const kue = require('kue');
const config = require('./../../infrastructure/config')();

const process = (job, processor, done) => {
  logger.info(`received job ${job.id} of type ${job.type}`);
  processor(job.data)
    .then(() => {
      logger.info(`successfully processed job ${job.id}`);
      done();
    })
    .catch((err) => {
      logger.error(`Error processing job ${job.id} - ${err.message}`);
      done(err);
    });
};

class Monitor {
  constructor(processorMapping) {
    this.processorMapping = processorMapping;
  }

  start() {
    const connectionString = (config.queueStorage && config.queueStorage.connectionString) ? config.queueStorage.connectionString : 'redis://127.0.0.1:6379';
    const queue = kue.createQueue({
      redis: connectionString,
    });
    this.processorMapping.forEach((mapping) => {
      queue.process(mapping.type, (job, done) => {
        process(job, mapping.processor, done);
      });
    });
  }
}

module.exports = Monitor;

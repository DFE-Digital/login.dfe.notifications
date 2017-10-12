const logger = require('./../logger');
const kue = require('kue');

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
    const queue = kue.createQueue();
    this.processorMapping.forEach(mapping => {
      queue.process(mapping.type, (job, done) => {
        process(job, mapping.processor, done);
      });
    });
  }
}

module.exports = Monitor;
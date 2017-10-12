const kue = require('kue');

const process = (job, processor, done) => {
  processor(job.data)
    .then(() => {
      done();
    })
    .catch((err) => {
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
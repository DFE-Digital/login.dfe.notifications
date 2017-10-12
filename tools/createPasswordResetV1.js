const kue = require('kue');

const queue = kue.createQueue();

const job = queue.create('passwordreset_v1', {
  email: 'user.one@dev.test',
  code: 'A1B2C3D4'
}).save((err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Job saved. Id ${job.id}`);
  }

  process.exit(0);
});
const kue = require('kue');

const queue = kue.createQueue({
  redis: 'redis://127.0.0.1:6379?db=1'
});

const job = queue.create('invitation_v1', {
  email: 'user.one@dev.test',
  firstName: 'User',
  lastName: 'One',
  serviceName: 'New Service',
  serviceWelcomeMessage: 'Access to this New service',
  serviceWelcomeMessageDescription: 'Welcome to this new service, you can use it in the following way'
}).save((err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Job saved. Id ${job.id}`);
  }

  process.exit(0);
});
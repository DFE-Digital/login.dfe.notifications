const email = require('./../email');

const processor = async (job) => {
  await email.send(job.email, 'password-reset', {
    code: job.code
  });
};

module.exports = processor;
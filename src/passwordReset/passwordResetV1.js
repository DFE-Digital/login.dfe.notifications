const Email = require('./../email');

const processor = async (job) => {
  const email = new Email();
  await email.send(job.email, 'password-reset', {
    code: job.code
  });
};

module.exports = processor;
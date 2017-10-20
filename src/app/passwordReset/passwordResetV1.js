const Email = require('./../../infrastructure/email');

const processor = async (job) => {
  const email = new Email();
  await email.send(job.email, 'password-reset', {
    code: job.code,
    clientId: job.clientId,
  });
};

module.exports = processor;
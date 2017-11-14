const Email = require('./../../infrastructure/email');
const config = require('./../../infrastructure/config')();

const processor = async (job) => {
  const email = new Email();
  await email.send(job.email, 'invitation', {
    firstName: job.firstName,
    lastName: job.lastName,
    returnUrl: `${config.hostingEnvironment.migrationUrl}`,
  }, `You have been invited to ${job.serviceName} using DfE Sign in`);
};

module.exports = processor;

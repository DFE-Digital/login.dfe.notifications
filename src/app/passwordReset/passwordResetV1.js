const Email = require('./../../infrastructure/email');
const config = require('./../../infrastructure/config')();
const uuid = require('uuid/v4');

const processor = async (job) => {
  const email = new Email();
  await email.send(job.email, 'password-reset', {
    code: job.code,
    clientId: job.clientId,
    returnUrl: `${config.hostingEnvironment.interactionsUrl}/${uuid()}/resetpassword/confirm?clientid=${job.clientId}`,
  }, 'Password reset');
};

module.exports = processor;

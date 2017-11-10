const logger = require('./../../infrastructure/logger');
const v1 = require('./invitationV1');

const registerProcessors = (processorMappings) => {
  processorMappings.push({
    type: 'invitation_v1',
    processor: v1,
  });
  logger.info('registered invitation_v1 processor');
};

module.exports.registerProcessors = registerProcessors;

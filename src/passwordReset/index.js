const logger = require('./../logger');
const v1 = require('./passwordResetV1');

const registerProcessors = (processorMappings) => {
  processorMappings.push({
    type: 'passwordreset_v1',
    processor: v1,
  });
  logger.info('registered passwordreset_v1 processor');
};

module.exports.registerProcessors = registerProcessors;

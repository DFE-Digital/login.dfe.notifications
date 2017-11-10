const logger = require('./../../infrastructure/logger');
const v1 = require('./invitationV1');
const assert = require('assert');
const config = require('./../../infrastructure/config')();

const registerProcessors = (processorMappings) => {

  assert(config.hostingEnvironment.migrationUrl,'Migration url must be provided for invitation emails');

  processorMappings.push({
    type: 'invitation_v1',
    processor: v1,
  });
  logger.info('registered invitation_v1 processor');
};

module.exports.registerProcessors = registerProcessors;

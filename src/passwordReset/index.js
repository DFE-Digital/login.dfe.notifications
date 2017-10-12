const v1 = require('./passwordResetV1');

const registerProcessors = (processorMappings) => {
  processorMappings.push({
    type: 'passwordreset_v1',
    processor: v1
  });
};

module.exports.registerProcessors = registerProcessors;
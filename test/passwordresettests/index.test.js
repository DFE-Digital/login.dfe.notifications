const utils = require('./../utils');
utils.mockConfig();

const passwordReset = require('../../src/app/passwordReset');

describe('when registering password reset processors', () => {
  let processorMappings;

  beforeEach(() => {
    processorMappings = [];
  });

  test('then it should add a v1 processor mapping', () => {
    passwordReset.registerProcessors(processorMappings);

    expect(processorMappings.length).toBe(1);
    expect(processorMappings[0].type).toBe('passwordreset_v1');
  });

});
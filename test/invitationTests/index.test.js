const utils = require('./../utils');
utils.mockConfig();

const invitation = require('./../../src/app/invitation');

describe('when registering invitation processors', () => {
  let processorMappings;

  beforeEach(() => {
    processorMappings = [];
  });

  test('then it should add a v1 processor mapping', () => {
    invitation.registerProcessors(processorMappings);

    expect(processorMappings.length).toBe(1);
    expect(processorMappings[0].type).toBe('invitation_v1');
  });

});

jest.mock('./../../src/infrastructure/config');


describe('when registering invitation processors', () => {
  let processorMappings;
  let config;
  let configStub;
  let invitation;

  beforeEach(() => {
    config = require('./../../src/infrastructure/config');
    configStub = jest.fn().mockImplementation(() => ({
      hostingEnvironment: {
        migrationUrl: 'asdasd'
      },
    }));
    config.mockImplementation(configStub);
    invitation = require('./../../src/app/invitation');
    processorMappings = [];
  });

  test('then it should add a v1 processor mapping', () => {
    invitation.registerProcessors(processorMappings);

    expect(processorMappings.length).toBe(1);
    expect(processorMappings[0].type).toBe('invitation_v1');
  });

});
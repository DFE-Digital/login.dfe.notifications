const getDefaultConfig = () => {
  return {
    loggerSettings: {
      logLevel: 'info',
      coors: {
        info: 'red',
        ok: 'green',
        error: 'yellow'
      }
    },
    email: {
      type: 'disk'
    }
  };
};

const mockConfig = (configData = undefined) => {
  if(configData === undefined || configData === null) {
    configData = getDefaultConfig();
  }

  jest.mock('./../src/config');
  const config = require('./../src/config');
  config.mockImplementation(() => {
    return configData;
  });
};

module.exports = {
  getDefaultConfig,
  mockConfig
};
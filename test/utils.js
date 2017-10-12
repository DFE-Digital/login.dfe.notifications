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

module.exports.getDefaultConfig = getDefaultConfig;

module.exports.mockConfig = (configData = undefined) => {
  if(configData === undefined || configData === null) {
    configData = getDefaultConfig();
  }

  jest.mock('./../src/config');
  const config = require('./../src/config/index');
  config.mockImplementation(() => {
    return configData;
  });
};
const logger = require('./infrastructure/logger');
const Monitor = require('./app/monitor');
const passwordReset = require('./app/passwordReset');

const processorMappings = [];
passwordReset.registerProcessors(processorMappings);

const monitor = new Monitor(processorMappings);
monitor.start();
logger.info('monitor started');

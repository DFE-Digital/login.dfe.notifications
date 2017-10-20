const logger = require('./logger');
const Monitor = require('./monitor');
const passwordReset = require('./passwordReset');

const processorMappings = [];
passwordReset.registerProcessors(processorMappings);

const monitor = new Monitor(processorMappings);
monitor.start();
logger.info('monitor started');

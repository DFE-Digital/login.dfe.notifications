const Monitor = require('./monitor');
const processorMappings = [];

const passwordReset = require('./passwordReset');
passwordReset.registerProcessors(processorMappings);

const monitor = new Monitor(processorMappings);
monitor.start();
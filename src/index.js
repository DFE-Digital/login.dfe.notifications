const Monitor = require('./monitor');

const monitor = new Monitor([
  {
    type: 'passwordreset_v1',
    processor: (job) => {
      console.log('passwordreset_v1 - ' + JSON.stringify(job));
      return Promise.resolve(null);
    }
  }
]);
monitor.start();
const DiskEmailAdapter = require('./DiskEmailAdapter');
const S3EmailAdapter = require('./S3EmailAdapter');

const config = require('./../config')();

const type = (config && config.email && config.email.type) ? config.email.type.toLowerCase() : 'disk';

if(type === 'disk') {
  module.exports = DiskEmailAdapter;
}
else if(type === 's3') {
  module.exports = S3EmailAdapter;
}
else {
  throw new Error(`Unknown email type ${config.email.type}`);
}
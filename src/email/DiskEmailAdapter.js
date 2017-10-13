const EmailAdapter = require('./EmailAdapter');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const emailUtils = require('./utils');

const ensureDirectory = async (template) => {
  let dir = path.resolve('app_data');
  await makeDirectory(dir);

  dir = path.join(dir, 'email');
  await makeDirectory(dir);

  dir = path.join(dir, template);
  await makeDirectory(dir);

  return dir;
};
const makeDirectory = async (path) => {
  const mkdir = promisify(fs.mkdir);
  try {
    await mkdir(path);
  }
  catch (e) {
    if(e.code !== 'EEXIST') {
      throw e;
    }
  }
};
const writeData = async (path, content) => {
  const writeFile = promisify(fs.writeFile);
  await writeFile(path, content);
}

class DiskEmailAdapter extends EmailAdapter {
  async send(recipient, template, data) {
    const dirPath = await ensureDirectory(template);
    const fileName = emailUtils.makeFileName();
    const content = emailUtils.getFileContent(recipient, template, data);
    await writeData(path.join(dirPath, fileName), content);
  }
}

module.exports = DiskEmailAdapter;
const EmailAdapter = require('./EmailAdapter');
const path = require('path');
const fs = require('fs');
const {promisify} = require('util');

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
const makeFileName = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth().toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day}T${hour}-${minute}-${second}.json`;
};
const writeData = async (path, data) => {
  const writeFile = promisify(fs.writeFile);
  await writeFile(path, JSON.stringify(data));
}

class DiskEmailAdapter extends EmailAdapter {
  async send(recipient, template, data) {
    const dirPath = await ensureDirectory(template);
    const fileName = makeFileName();
    await writeData(path.join(dirPath, fileName), {
      recipient,
      template,
      data
    });
  }
}

module.exports = DiskEmailAdapter;
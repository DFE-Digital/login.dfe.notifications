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

const getFileContent = (recipient, template, data) =>
  JSON.stringify({
    recipient,
    template,
    data,
  });

module.exports = {
  makeFileName,
  getFileContent,
};

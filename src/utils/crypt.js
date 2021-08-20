const crypto = require('crypto');

const SECRET_KEY = `rickhuang_123456!!`;

// md5
const md5 = (content) => {
  let md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}

const generatePassword = (password) => {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
}



const loginCheck = (username, password) => {
  if (username === 'rick' && password === '12') {
    return true;
  } else {
    return false;
  }
}

module.exports = {loginCheck}
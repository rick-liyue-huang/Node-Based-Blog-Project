const {exec, escape} = require('../db/mysql');

const loginCheck = (username, password) => {
  // sql inject
  username = escape(username);
  password = escape(password);

  // const sql = `select username, realname from users where username = '${username}' and password = '${password}';`;
  const sql = `select username, realname from users where username = ${username} and password = ${password};`;
  console.log('sql: ' + sql);
  return exec(sql).then(rows => {
    return rows[0] || {};
  });
}

module.exports = {loginCheck}

/*
* if (username === 'rick' && password === '12') {
    return true;
  } else {
    return false;
  }
* */
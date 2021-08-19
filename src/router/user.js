const {loginCheck} = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/responseModel');
const {set} = require('../db/redis');

const getCookieExpireTime = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
}

const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'POST' && req.path === '/api/user/login') {
    const {username, password} = req.body;
    // const {username, password} = req.query;
    const result = loginCheck(username, password);
    return result.then(data => {
      if (data.username) {
        // deal with cookie
        // res.setHeader(`Set-Cookie`, `username=${data.username};path=/;httpOnly;expires=${getCookieExpireTime()}`);

        // set session
        req.session.username = data.username;
        req.session.realname = data.realname;
        // sync to redis
        set(req.sessionId, req.session);
        console.log('req.session is ', req.session);
        return new SuccessModel(data);
      } else {
        return new ErrorModel('login failure');
      }
    });
  }

//  check it logins or not
  if (method === 'GET' && req.path === '/api/user/login-t') {
    console.log('req.cookie.username', req.cookie.username);
    if (req.session.username) {
      return Promise.resolve(new SuccessModel({
        session: req.session
      }));
    } else {
      return Promise.resolve(new ErrorModel('un login'));
    }
  }
}

module.exports = handleUserRouter;

/*
* if (result) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel('login failure');
    }
* */
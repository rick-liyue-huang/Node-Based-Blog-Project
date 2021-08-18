const {loginCheck} = require('../controller/user');
const {SuccessModel, ErrorModel} = require('../model/responseModel');

const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'POST' && req.path === '/api/user/login') {
    const {username, password} = req.body;
    const result = loginCheck(username, password);
    return result.then(data => {
      if (data.username) {
        return new SuccessModel(data);
      } else {
        return new ErrorModel('login failure');
      }
    });

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
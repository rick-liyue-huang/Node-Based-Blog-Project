const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../model/responseModel');

// login verification
const verifyLogin = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('no login'));
  }
}


const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  if (method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author  || '';
    const keyword = req.query.keyword || '';

    if (req.query.isadmin) {
      const loginResult = verifyLogin(req);
      if (loginResult) {
        return loginResult;
      }
      author = req.session.username;
    }


    // const listData = getList(author, keywords);
    const result = getList(author, keyword);
    return result.then(listData => {
      return new SuccessModel(listData);
    });

  }

  if (method === 'GET' && req.path === '/api/blog/detail') {
    // const  detailData = getDetail(id);
    // return new SuccessModel(detailData);
    const result = getDetail(id);
    return result.then(data => {
      return new SuccessModel(data);
    });
  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    // const blogData = req.body;
    // const data = newBlog(blogData);
    // return new SuccessModel(data);

    const loginResult = verifyLogin(req);
    if (loginResult) {
      return loginResult;
    }

    // req.body.author = 'leo'; // fake data
    req.body.author = req.session.username;
    const result = newBlog(req.body);
    return result.then(data => {
      return new SuccessModel(data);
    });
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    const loginResult = verifyLogin(req);
    if (loginResult) {
      return loginResult;
    }

    const result = updateBlog(id, req.body);
    return result.then(value => {
      if (value) {
        return new SuccessModel(value);
      } else {
        return new ErrorModel('update error');
      }
    })

  }

  if (method === 'POST' && req.path === '/api/blog/delete') {
    const loginResult = verifyLogin(req);
    if (loginResult) {
      return loginResult;
    }
    // const author = 'leo';
    const author = req.session.username;
    const result = deleteBlog(id, author);
    return result.then(value => {
      if (value) {
        return new SuccessModel(value);
      } else {
        return new ErrorModel('delete error');
      }
    });
  }
}

module.exports = handleBlogRouter;


/*
* if (result) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel('update error');
    }
* */
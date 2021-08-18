const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../model/responseModel');

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author  || '';
    const keywords = req.query.keywords || '';
    // const listData = getList(author, keywords);
    const result = getList(author, keywords);
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

    req.body.author = 'leo'; // fake data
    const result = newBlog(req.body);
    return result.then(data => {
      return new SuccessModel(data);
    });
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
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
    const author = 'leo';
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
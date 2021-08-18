const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../model/responseModel');

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;

  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author  || '';
    const keywords = req.query.keywords || '';
    const listData = getList(author, keywords);
    return new SuccessModel(listData);
  }

  if (method === 'GET' && req.path === '/api/blog/detail') {
    const  detailData = getDetail(id);
    return new SuccessModel(detailData);
  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    const blogData = req.body;
    const data = newBlog(blogData);
    return new SuccessModel(data);
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body);
    if (result) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel('update error');
    }
  }

  if (method === 'POST' && req.path === '/api/blog/delete') {
    const result = deleteBlog(req.body);
    if (result) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel('delete error');
    }
  }
}

module.exports = handleBlogRouter;
const getList = (author, keywords) => {
  return [
    {
      id: 1,
      title: 'title a',
      content: 'content a',
      createdTime: Date.now(),
      author: 'rick'
    },
    {
      id: 2,
      title: 'title b',
      content: 'content b',
      createdTime: Date.now(),
      author: 'leo'
    }
  ];
};

const getDetail = (id) => {
  return {
    id: 1,
    title: 'title a',
    content: 'content a',
    createdTime: Date.now(),
    author: 'rick'
  }
}

const newBlog = (blogData = {}) => {
  console.log('new blogdata');
//  blogData contains title, content,
  return {
    id: 3
  }
}

const updateBlog = (id, blogData = {}) => {
  console.log('update blog');
  return false;
}

const deleteBlog = (id) => {
  console.log('delete blog');
  return true;
}

module.exports = {getList, getDetail, newBlog, updateBlog, deleteBlog};
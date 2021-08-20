const xss = require('xss');
const {exec} = require('../db/mysql');

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1 = 1 `;
  if (author) {
    sql += `and author = '${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createdtime desc;`;
  // return promise
  return exec(sql);
};

const getDetail = (id) => {
  const sql = `select * from blogs where id = '${id}';`;
  return exec(sql).then(rows => {
    return rows[0];
  })
}

const newBlog = (blogData = {}) => {
  console.log('new blogdata');
//  blogData contains title, content,
//   const title = blogData.title;
//   const content = blogData.content;
//   const author = blogData.author;

  // prevent xss
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const author = xss(blogData.author);
  const createdTime = Date.now();

  const sql = `insert into blogs (title, content, createdtime, author) values ('${title}', '${content}', '${createdTime}', '${author}');`;
  return exec(sql).then(insertData => {
    console.log(insertData);

    return {
      id: insertData.insertId
    };
  })
}

const updateBlog = (id, blogData = {}) => {
  console.log('update blog');
  // return false;
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const sql =  `update blogs set title = '${title}', content = '${content}' where id = '${id}';`;
  return exec(sql).then(updateData => {
    console.log(updateData);
    if (updateData.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  })
}

const deleteBlog = (id, author) => {
  console.log('delete blog');
  // return true;
  const sql = `delete from blogs where id = '${id}' and author = '${author}';`;
  return exec(sql).then(deleteData => {
    if (deleteData.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  })
}


module.exports = {getList, getDetail, newBlog, updateBlog, deleteBlog};


/*
* return [
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
    * ];
    *
    * return {
    id: 1,
    title: 'title a',
    content: 'content a',
    createdTime: Date.now(),
    author: 'rick'
  }
  *
  * return {
    id: 3
  }
* */
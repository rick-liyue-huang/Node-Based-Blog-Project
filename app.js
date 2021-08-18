const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// deal with post method
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      // don't need post data
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    })
  });
  return promise
}

const serverHandler = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);

  getPostData(req).then(postData => {
    req.body = postData;

    // deal with blog router
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // deal with user router
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        res.end(JSON.stringify(userData));
      });
      return;
    }

//  deal with 404
    res.writeHead(404, {'content-type': 'text/plain'});
    res.write('404 Not found\n');
    res.end();
  });

}

module.exports = serverHandler;


/*
* const blogData = handleBlogRouter(req, res);
    if (blogData) {
      // res.end(JSON.stringify(blogData));
      res.end(JSON.stringify(blogData))
      return;
    }
    *
    * const userData = handleUserRouter(req, res);
    if (userData) {
      res.end(JSON.stringify(userData));
      return;
    }
* */
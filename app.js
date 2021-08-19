const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// session
const SESSION_DATA = {};
const getCookieExpireTime = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
}

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
  // decompose query
  req.query = querystring.parse(url.split('?')[1]);

  // decompose cookie k1=v1;k2=v2;
  req.cookie = {};
  const cookieString = req.headers.cookie || '';
  cookieString.split(';').forEach(item => {
    if (!item) {
      return;
    }
    const arr = item.split('=');
    const key = arr[0].trim();
    const value = arr[1].trim();
    req.cookie[key] = value;
  });
  console.log('req.cookie: ', req.cookie);

  // decompose session
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  req.session = SESSION_DATA[userId];



  getPostData(req).then(postData => {
    req.body = postData;

    // deal with blog router
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader(`Set-Cookie`, `userid=${userId};path=/;httpOnly;expires=${getCookieExpireTime()}`);
        }
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // deal with user router
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader(`Set-Cookie`, `userid=${userId};path=/;httpOnly;expires=${getCookieExpireTime()}`);
        }
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
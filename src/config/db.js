const env = process.env.NODE_ENV;

let MYSQL_CONFIG;

if (env === 'dev') {
  MYSQL_CONFIG = {
    host: 'rm-p0wdl42kq3i0q35a6no.mysql.australia.rds.aliyuncs.com',
    user: 'superrick',
    password: 'Abc123456',
    port: 3306,
    database: 'nodeblog'
  };
}

if (env === 'production') {
  MYSQL_CONFIG = {
    host: 'rm-p0wdl42kq3i0q35a6no.mysql.australia.rds.aliyuncs.com',
    user: 'superrick',
    password: 'Abc123456',
    port: 3306,
    database: 'nodeblog'
  };
}

module.exports = {MYSQL_CONFIG}
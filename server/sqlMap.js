var sqlMap = {
  user: {
    // 添加用户
    reg: 'insert into user(userid,password,root) values(?,?,2)',
    login: 'select * from user where userid = ? and password = ?',
    update: 'update user set password = ? where userid = ?',
    select: 'select * from user where userid = ?'
    // select: 'select * from user where name like "%"?"%"'
  },
  test: {
    queSelect: 'select * from questions',
    resSelect: 'select * from result',
    cateSelect: 'select * from cate'
  }
}

module.exports = sqlMap

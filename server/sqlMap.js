var sqlMap = {
  user: {
    // 添加用户
    add: 'insert into user(userid,password) values(?,?)',
    select: 'select * from user where userid = ? and password = ?',
    update: 'update user set password = ? where userid = ?'
    // select: 'select * from user where name like "%"?"%"'
  }
}

module.exports = sqlMap

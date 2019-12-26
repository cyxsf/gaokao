var sqlMap = {
  user: {
    // 添加用户
    add: 'insert into user(name,age) values(?,?)',
    select: 'select * from user where name like "%"?"%"'
  }
}

module.exports = sqlMap

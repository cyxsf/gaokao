var sqlMap = {
  user: {
    // 注册登录
    reg: 'insert into user(userid,password,root) values(?,?,1)',
    login: 'select * from user where userid = ? and password = ?',
    update: 'update user set password = ? where userid = ?',
    select: 'select * from user where userid = ?'
    // select: 'select * from user where name like "%"?"%"'
  },
  test: {
    // 兴趣测试
    queSelect: 'select * from questions',
    resSelect: 'select * from result',
    cateSelect: 'select * from cate'
  },
  forecast: {
    // 学校预测
    proSelect: 'select * from province order by psort',
    basInfo: 'insert into userinfo(userid,curplace,subject,score) values(?,?,?,?)',
    basSelect: 'select * from userinfo where userid = ?',
    basUpdate: 'update userinfo set curplace = ?,subject = ?,score = ? where userid = ?',
    finalTour: 'select * from univerinfo where id = ? or id = ?'
  },
  community: {
    senSelect: 'select * from seniors'
  }
}

module.exports = sqlMap

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
    proSelect: 'select * from province',
    basInfo: 'insert into userinfo(userid,curplace,subject,score) values(?,?,?,?)',
    basSelect: 'select * from userinfo where userid = ?',
    basUpdate: 'update userinfo set curplace = ?,subject = ?,score = ? where userid = ?',
    finalTour: 'select * from univerinfo where id = ? or id = ?'
  },
  community: {
    senSelect: 'select * from seniors'
  },
  select: {
    // 学校、专业选择
    schoolSelect: 'select * from univerinfo where curplace = ?',
    majorSelect: 'select * from majors where school = ?'
  },
  iden: {
    insertIden: 'insert into identity(userid,school,major,year,imgStr,imgStrs) values(?,?,?,?,?,?)'
  },
  publish: {
    insertArt: 'insert into pubArticle(id,userid,title,markdown,html,date) values(?,?,?,?,?,?)',
    myArtList: 'select * from pubArticle where userid = ?',
    selectArt: 'select * from pubArticle where id = ?',
    delArt: 'delete from pubArticle where id = ?',
    updateArt: 'update pubArticle set userid =?,title=?,markdown=?,html=?,date=? where id = ?'
  }
}

module.exports = sqlMap

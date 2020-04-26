var sqlMap = {
  user: {
    // 注册登录
    reg: 'insert into user(userid,password,root) values(?,?,1)',
    login: 'select * from user where userid = ? and password = ?',
    update: 'update user set password = ? where userid = ?',
    select: 'select * from user where userid = ?',
    upInfo: 'update userinfo set name = ?, avatar = ? where userid = ?',
    basInfo: 'insert into userinfo(userid,name,avatar) values(?,?,?)',
    senSelect: 'select * from seniors a join userinfo b on a.userid = b.userid where a.userid <> ?'
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
    basUpdate: 'update userinfo set curplace = ?,subject = ?,score = ? where userid = ?',
    basSelect: ' select * from userinfo where userid = ?',
    finalTour: 'select distinct school from forPoint where curplace = ? and subject = ? and lowest >= ? and lowest < ? order by lowest',
    schoolSelect: 'select * from univerinfo where school = ?'
  },
  select: {
    // 学校、专业选择
    schoolSelect: 'select * from univerinfo where curplace = ?',
    majorSelect: 'select * from majors where school = ?'
  },
  iden: {
    senSelect: 'select * from seniors where userid <> ?',
    insertIden: 'insert into identity(userid,school,major,year,imgStr,imgStrs,exam) values(?,?,?,?,?,?,0)',
    selIden: 'select * from identity where userid = ?',
    upIden: 'update identity set school=?,major=?,year=?,imgStr=?,imgStrs=?,exam=0 where userid=?'
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

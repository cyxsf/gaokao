var sqlMap = {
  user: {
    // 注册登录
    reg: 'insert into user(userid,password,root) values(?,?,1)',
    login: 'select * from user where userid = ? and password = ?',
    update: 'update user set password = ? where userid = ?',
    select: 'select * from user where userid = ?',
    upInfo: 'update userinfo set name = ?, avatar = ? where userid = ?',
    basInfo: 'insert into userinfo(userid,name,avatar,balance) values(?,?,?,0)',
    senSelect: 'select * from seniors a join userinfo b on a.userid = b.userid where a.userid <> ?',
    upBalance: 'update userinfo set balance = ? where userid = ?'
    // select: 'select * from user where name like "%"?"%"'
  },
  test: {
    // 兴趣测试
    queSelect: 'select * from questions',
    resSelect: 'select * from result',
    cateSelect: 'select * from cate',
    upInfo: 'update userinfo set cateid = ? where userid = ?'
  },
  forecast: {
    // 学校预测
    proSelect: 'select * from province',
    basUpdate: 'update userinfo set curplace = ?,subject = ?,score = ? where userid = ?',
    basSelect: ' select * from userinfo where userid = ?',
    preUpdate: 'update userinfo set preapp = ?, prereg = ?, premajor = ? where userid = ?',
    finalTour: 'select school,(diff+line) as score from forDiff a join forLine b where a.curplace = b.curplace and a.subject = b.subject and a.batch = b.batch and a.curplace = ? and a.subject = ? and  (diff+line)>= ? and  (diff+line)< ? order by (diff+line)',
    schoolSelect: 'select * from univerinfo where school = ?',
    resSelect: 'select * from result where cateid = ?',
    preReg: 'select * from preReg',
    preMajor: 'select * from preMajor',
    regSel: 'select * from preReg where region = ?',
    majorSel: 'select * from preMajor where major = ?',
    goPre: 'select * from userinfo where userid = ? and curplace <> ? and subject <> ? and score <> ?',
    inseReco: 'insert into recoList(userid,school,rate,collect,cate) values (?,?,?,0,?)',
    upReco: 'update recoList set rate = ?,collect = ? where userid = ? and school = ?',
    selReco: 'select * from recoList where userid = ? and cate = ?',
    delReco: 'delete from recoList where userid = ? and school = ?'
  },
  select: {
    // 学校、专业选择
    schoolSelect: 'select * from univerinfo where curplace = ?',
    majorSelect: 'select * from majors where school = ?',
    seniSelect: 'select * from seniors where userid = ?'
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
    updateArt: 'update pubArticle set userid =?,title=?,markdown=?,html=?,date=? where id = ?',
    allArt: 'select * from pubArticle'
  }
}

module.exports = sqlMap

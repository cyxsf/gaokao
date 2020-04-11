var express = require('express')
var router = express.Router()
module.exports = router

var DBHelper = require('../DBHelper')
var sql = require('../sqlMap')
var smsUtil = require('../../src/config/sendCode')

router.post('/userReg', (req, res) => { // 用户注册
  let sqlStr = sql.user.reg
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.uid, params.pwdOne], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/userLogin', (req, res) => { // 用户登录
  let sqlStr = sql.user.login
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.uid, params.pwd], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/userUpdate', (req, res) => { // 更新用户密码
  let sqlStr = sql.user.update
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.pwdOne, params.uid], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/userSelect', (req, res) => { // 查找用户
  let sqlStr = sql.user.select
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.uid], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/basInfo', (req, res) => { // 插入用户信息
  let sqlStr = sql.user.basInfo
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.uid, '', ''], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/upInfo', (req, res) => { // 更新用户信息
  let sqlStr = sql.user.upInfo
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.name, params.avatar, params.uid], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/senSelect', (req, res) => { // 查找学长学姐
  let sqlStr = sql.user.senSelect
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.uid], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

/*
发送验证码短信
*/
router.get('/sendCode', function (req, res, next) {
  // 1. 获取请求参数数据
  var phone = req.query.phone
  // 2. 处理数据
  // 生成验证码(6位随机数)
  var code = smsUtil.randomCode(6)
  // 发送给指定的手机号
  console.log(`向${phone}发送验证码短信: ${code}`)
  smsUtil.sendCode(phone, code, function (success) { // success表示是否成功
    if (success) {
      // users[phone] = code
      console.log('保存验证码: ', phone, code)
      res.send({'code': 0,
        'phone': phone,
        'smscode': code})
    } else {
      // 3. 返回响应数据
      res.send({'code': 1, msg: '短信验证码发送失败'})
    }
  })
})

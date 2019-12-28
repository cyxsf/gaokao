var express = require('express')
var router = express.Router()

var DBHelper = require('../DBHelper')
var sql = require('../sqlMap')

// 用户注册
router.post('/userReg', (req, res) => {
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

// 用户登录
router.post('/userLogin', (req, res) => {
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

// 更新用户密码
router.post('/userUpdate', (req, res) => {
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

// 查找用户
router.post('/userSelect', (req, res) => {
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

module.exports = router

var express = require('express')
var router = express.Router()
module.exports = router

var DBHelper = require('../DBHelper')
var sql = require('../sqlMap')

router.post('/senSelect', (req, res) => { // 查找学长学姐
  let sqlStr = sql.community.senSelect
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/insertIden', (req, res) => { // 插入身份认证
  let sqlStr = sql.iden.insertIden
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.uid, params.school, params.major, params.year, params.imgStr, params.imgStrs], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/examIden', (req, res) => { // 判断身份认证
  let sqlStr = sql.iden.selIden
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

router.post('/upIden', (req, res) => { // 更新身份认证
  let sqlStr = sql.iden.upIden
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.school, params.major, params.year, params.imgStr, params.imgStrs, params.uid], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})
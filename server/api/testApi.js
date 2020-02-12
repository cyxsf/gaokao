var express = require('express')
var router = express.Router()
module.exports = router

var DBHelper = require('../DBHelper')
var sql = require('../sqlMap')

router.post('/queSelect', (req, res) => { // 查找题目
  let sqlStr = sql.test.queSelect
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

router.post('/resSelect', (req, res) => { // 查找结果
  let sqlStr = sql.test.resSelect
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

router.post('/cateSelect', (req, res) => { // 查找类型
  let sqlStr = sql.test.cateSelect
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

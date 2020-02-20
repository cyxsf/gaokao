var express = require('express')
var router = express.Router()
module.exports = router

var DBHelper = require('../DBHelper')
var sql = require('../sqlMap')

router.post('/proSelect', (req, res) => { // 查找省份
  let sqlStr = sql.forecast.proSelect
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

router.post('/basInfo', (req, res) => { // 插入基本信息
  let sqlStr = sql.forecast.basInfo
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.uid, params.local, params.sub, params.score], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/basSelect', (req, res) => { // 查找基本信息
  let sqlStr = sql.forecast.basSelect
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

router.post('/basUpdate', (req, res) => { // 更新基本信息
  let sqlStr = sql.forecast.basUpdate
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.local, params.sub, params.score, params.uid], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/finalTour', (req, res) => { // 填报指南
  let sqlStr = sql.forecast.finalTour
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.fid, params.sid], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

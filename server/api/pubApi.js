var express = require('express')
var router = express.Router()
module.exports = router

var DBHelper = require('../DBHelper')
var sql = require('../sqlMap')

router.post('/insertArt', (req, res) => { // 插入发表的文章
  let sqlStr = sql.publish.insertArt
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.pid, params.uid, params.title, params.markdown, params.html, params.date], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/myArtList', (req, res) => { // 用户自己发布文章列表
  let sqlStr = sql.publish.myArtList
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

router.post('/selectArt', (req, res) => { // 查找发表的文章
  let sqlStr = sql.publish.selectArt
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.id], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/delArt', (req, res) => { // 删除已经发表的文章
  let sqlStr = sql.publish.delArt
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.id], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/updateArt', (req, res) => { // 更新已经发表的文章
  let sqlStr = sql.publish.updateArt
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.uid, params.title, params.markdown, params.html, params.date, params.id], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/allArt', (req, res) => { // 查找全部已发表的文章
  let sqlStr = sql.publish.allArt
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

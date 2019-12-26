var express = require('express')
var router = express.Router()

var DBHelper = require('../DBHelper')
var sql = require('../sqlMap')

// 增加用户接口
router.post('/addUser', (req, res) => {
  let sqlStr = sql.user.add
  let params = req.body
  console.log(sqlStr + 'zzz')
  console.log(params + 'yyy')
  let conn = new DBHelper().getConn()
  console.log(params)
  conn.query(sqlStr, [params.name, params.age], function (err, result) {
    if (err) {
      console.log('添加失败' + err)
    }
    if (result) {
      res.json(res, result)
    }
  })
  conn.end()
})

// 查询用户
router.post('/selectUser', (req, res) => {
  let sqlStr = sql.user.select
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.name], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  conn.end()
})

module.exports = router

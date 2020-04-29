var express = require('express')
var router = express.Router()
module.exports = router

var DBHelper = require('../DBHelper')
var sql = require('../sqlMap')

const multiparty = require('connect-multiparty')
const fs = require('fs')
const path = require('path')

const multipartyMiddleware = multiparty({
  uploadDir: './temp'
}) // 设置上传文件存放的地址

router.post('/goPre', (req, res) => { // 是否直接跳转到偏好
  let sqlStr = sql.forecast.goPre
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.uid, '', '', ''], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

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

router.post('/preUpdate', (req, res) => { // 更新基本信息
  let sqlStr = sql.forecast.preUpdate
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.preApp, params.reg, params.major, params.uid], (err, result) => {
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

router.post('/schoolSelect', (req, res) => { // 查找基本信息
  let sqlStr = sql.forecast.schoolSelect
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.school], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/resSelect', (req, res) => { // 查找测评结果信息
  let sqlStr = sql.forecast.resSelect
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.cateid], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/preReg', (req, res) => { // 查找地域偏好
  let sqlStr = sql.forecast.preReg
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

router.post('/preMajor', (req, res) => { // 查找专业偏好
  let sqlStr = sql.forecast.preMajor
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

router.post('/regSel', (req, res) => { // 查找专业偏好
  let sqlStr = sql.forecast.regSel
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.item], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/majorSel', (req, res) => { // 查找专业偏好
  let sqlStr = sql.forecast.majorSel
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.item], (err, result) => {
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
  conn.query(sqlStr, [params.cur, params.sub, params.low, params.high], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

const IMG_PATH = path.resolve('../static/uploads/')
const IMG_PATH2 = path.resolve('../../gaokao-back/static/uploads/')
router.post('/upload', multipartyMiddleware, async (req, res) => {
  console.log(req.body) // 返回请求主体
  console.log(req.files) // 文件属性，包含文件的所有信息
  console.log(req.files.file.path) // 文件路径
  try {
    let files = req.files
    for (let item in files) {
      let tmpPath = files[item].path
      // let name = files[item].name

      let d = new Date()
      let getTime = `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}${d.getTime()}`

      let newImgPath = path.resolve(IMG_PATH, `${getTime}.png`)
      let newImgPath2 = path.resolve(IMG_PATH2, `${getTime}.png`)

      let result = await RenameFile(tmpPath, newImgPath)
      let result2 = await copyFile(newImgPath, newImgPath2)

      if (!result || !result2) {
        return res.send({
          errCode: -50000,
          msg: 'upload error'
        })
      }
    }
    res.send({
      errCode: 0,
      msg: 'upload success'
    })
  } catch (err) {
    return res.send({
      errCode: -50000,
      msg: 'upload error'
    })
  }
})

router.get('/getImgList', async (req, res) => {
  let result = await getImgSrc()
  res.send(result)
})

function RenameFile (oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.log(err)
        return reject(err)
      }
      resolve(true)
    })
  })
}

function copyFile (oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.copyFile(oldPath, newPath, (err) => {
      if (err) {
        console.log(err)
        return reject(err)
      }
      resolve(true)
    })
  })
}

function getImgSrc () {
  return new Promise((resolve, reject) => {
    fs.readdir(path.resolve('../static/uploads'), (err, result) => {
      if (err) {
        return reject(err)
      }
      result = result.map(item => '/uploads/' + item)
      result = result.slice(-1)
      resolve(result)
    })
  })
}

router.post('/schSelect', (req, res) => { // 学校选择
  let sqlStr = sql.select.schoolSelect
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.cur], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

router.post('/majorSelect', (req, res) => { // 专业选择
  let sqlStr = sql.select.majorSelect
  let params = req.body
  let conn = new DBHelper().getConn()
  conn.query(sqlStr, [params.school], (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
  // conn.end()
})

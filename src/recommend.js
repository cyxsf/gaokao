const exec = require('child_process').exec
// const execSync = require('child_process').execSync
const iconv = require('iconv-lite') // 解码包，解决中文乱码问题
// 异步执行
exec('python C:/Users/87046/Documents/GitHub/gaokao/src/CB.py', { encoding: 'buffer' }, function (error, stdout, stderr) {
  if (error) {
    console.info('stderr : ' + stderr)
  }
  var out = iconv.decode(stdout, 'cp936')
  console.log('exec: ' + out)
})
/* 同步执行  中文乱码
const output = execSync('python C:/Users/87046/Documents/GitHub/gaokao/src/CB.py')
console.log('sync: ' + output)
console.log('over')
*/

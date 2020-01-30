const fs = require('fs')
const stream = require('stream')
const express = require('express')
const app = express()

const logDir = __dirname + "/log"

const logtxt = logDir + "/log.txt"

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

app.use(function (req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const now = new Date().toISOString().
  replace(/T/, ' ').
  replace(/\..+/, '')
  console.log(`${now}: ${ip}`)
  fs.appendFileSync(logtxt, `${now}: ${ip}\n`)
  next()
})

const port = 4500
 
app.use('/img', express.static(__dirname + '/img'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/test.html')
})
 
app.listen(port)
console.log(`listening at ${port}!`)
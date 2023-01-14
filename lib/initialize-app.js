require('use-strict')
require('dotenv').config()

module.exports = () => new Promise((resolve, reject) => {

  global.fs = require('fs')
  global.path = require('path')

  global.os = require('os')
  global.moment = require(path.join(__root, '/lib/moment'))
  global.moment.updateLocale('tr')
  require('colors')

  Number.prototype.toDigit = function (digit) {
    var t = this
    var s = t.toString()
    if (s.length < digit) {
      s = '0'.repeat(digit - s.length) + s
    }
    return s
  }

  function simdi() {
    var s = yyyymmddhhmmss(new Date())
    return s

    function yyyymmddhhmmss(tarih) {
      var yyyy = tarih.getFullYear().toDigit(4)
      var mm = (tarih.getMonth() + 1).toDigit(2)
      var dd = tarih.getDate().toDigit(2)
      var HH = tarih.getHours().toDigit(2)
      var min = tarih.getMinutes().toDigit(2)
      var sec = tarih.getSeconds().toDigit(2)

      return `${yyyy}-${mm}-${dd} ${HH}:${min}:${sec}`
    }
  }

  global.eventLog = function (obj, ...placeholders) {
    console.log(simdi(), obj, ...placeholders)
  }

  global.errorLog = function (obj, ...placeholders) {
    console.error(simdi().red, obj, ...placeholders)
  }




  if (process.argv[2] == 'localhost' || process.argv[2] == '-l' || process.argv[2] == '-dev' || process.argv[2] == '-development') {
    process.env.NODE_ENV = 'development'
  } else {
    process.env.NODE_ENV =process.env.NODE_ENV || 'release'
  }

  process.env.TEMP_DIR=process.env.TEMP_DIR || os.tmpdir()
  process.env.PORT=process.env.PORT || 3000

  global.ejs = require('ejs')
  // global.uuid = require('uuid')

  global.atob = require('atob')
  global.btoa = require('btoa')

  require('colors')
  global.util = require(path.join(__root, '/lib/util'))
  global.mail = require(path.join(__root, '/lib/mail'))

  let packJson=require(path.join(__root,'package.json'))
  console.log('-'.repeat(70))
  console.log(`${'Application Name:'.padding(25)} ${(packJson.name || '').brightYellow}`)
  console.log(`${'Version:'.padding(25)} ${(packJson.version || '').yellow}`)
  console.log(`${'Http Port:'.padding(25)} ${process.env.PORT.toString().yellow}`)
  console.log(`${'Temp folder:'.padding(25)} ${process.env.TEMP_DIR.yellow}`)
  console.log(`${'Running Mode:'.padding(25)} ${process.env.NODE_ENV.toUpperCase().cyan}`)
  console.log(`${'Uptime Started:'.padding(25)} ${simdi().yellow}`)
  console.log('-'.repeat(70))
  resolve()
}) 
process.on('uncaughtException', e => {
  console.error(e)
})

process.on('unhandledRejection', e => {
  console.error(e)
})

const chai = require('chai')
const path = require('path')

require('dotenv').config({path: path.join(__dirname, '../.env')})

chai.config.includeStack = true
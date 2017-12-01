'use strict'

const generateRSSFeed = require('.')
const generateRawFeed = require('./raw')

generateRSSFeed('jung-und-gott')
// generateRawFeed('jung-und-gott')
.then(console.log)
.catch((err) => {
	console.error(err)
	process.exitCode = 1
})

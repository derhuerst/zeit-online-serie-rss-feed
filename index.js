'use strict'

const Feed = require('rss')

const generateRawFeed = require('./raw')

const generateRSSFeed = (serie) => {
	return generateRawFeed(serie)
	.then(({meta, items}) => {
		const feed = new Feed(meta)
		for (let item of items) feed.item(item)
		return feed.xml()
	})
}

module.exports = generateRSSFeed

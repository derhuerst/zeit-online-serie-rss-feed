'use strict'

const crypto = require('crypto')
const url = require('url')
const Promise = require('pinkie-promise')
const {fetch} = require('fetch-ponyfill')({Promise})
const xmlQuery = require('xml-query')
const XmlReader = require('xml-reader')

const pkg = require('./package.json')

const USER_AGENT = 'https://gist.github.com/derhuerst/173ca78ac1c22b009daf73f35acf8ec6'

const sha256 = text => crypto.createHash('sha256').update(text).digest('hex')

const articleUrl = (articleXmlUrl) => {
	const parsed = url.parse(articleXmlUrl)
	delete parsed.host
	parsed.hostname = 'www.zeit.de'
	return url.format(parsed)
}

const imageUrl = (imageXmlUrl) => {
	const parsed = url.parse(imageXmlUrl)
	delete parsed.host
	parsed.hostname = 'img.zeit.de'
	delete parsed.path
	parsed.pathname += 'wide__220x124__desktop'
	return url.format(parsed)
}

const parseBlock = (block) => {
	if (!block.attributes) return null
	const a = block.attributes
	if (a.contenttype !== 'article') return null
	if (!a.href || !a.uniqueId) return null

	const $ = xmlQuery(block)
	return {
		guid: sha256(a.uniqueId),
		url: articleUrl(a.href),
		title: $.find('title').text(),
		description: $.find('description').text(),
		author: $.attr('author'),
		enclosure: { // todo: is this the way to do images?
			url: imageUrl($.find('image').attr('base-id'))
		}
	}
}

const generateRawFeed = (serie) => {
	return fetch('http://xml.zeit.de/serie/' + serie, {
		redirect: 'follow',
		headers: {'user-agent': USER_AGENT}
	})
	.then((res) => {
		if (!res.ok) {
			const err = new Error(res.statusText)
			err.statusCode = res.status
			throw err
		}
		return res.text()
	})
	.then((xml) => new Promise((resolve, reject) => {
		const meta = {
			title: null,
			description: null,
			site_url: 'http://www.zeit.de/serie/' + serie,
			image_url: null,
			language: 'de',
			generator: pkg.homepage
		}
		const onRegion = (region) => {
			if (!region.attributes || region.attributes.kind !== 'solo') return
			const $ = xmlQuery(region)

			const image = $.find('image').text()
			if (image) meta.image_url = image

			const description = $.find('text').text()
			if (description) meta.description = description

			$.find('container').each((c) => {
				const attr = c.attributes
				const title = attr && attr.title || attr.supertitle
				if (title) meta.title = title
			})
		}

		const items = []
		const onBlock = (block) => {
			const parsed = parseBlock(block)
			if (parsed) items.push(parsed)
		}

		const reader = XmlReader.create()
		reader.on('tag:region', onRegion)
		reader.on('tag:block', onBlock)
		reader.once('error', (err) => reject(err))
		reader.once('done', () => resolve({meta, items}))
		reader.parse(xml)
	}))
}

module.exports = generateRawFeed

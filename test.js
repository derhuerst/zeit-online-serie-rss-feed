'use strict'

const tapePromise = require('tape-promise').default
const tape = require('tape')
const co = require('co')

const generateRawFeed = require('./raw')
const pkg = require('./package.json')

const assertNonEmptyStr = (t, str, name) => {
	t.equal(typeof str, 'string', name + ' is not a string')
	t.ok(str.length > 0, name + ' is empty')
}

const validHex = /^[0-9a-f]+$/i
const assertHexStr = (t, hexStr, name) => {
	assertNonEmptyStr(t, hexStr, name)
	t.ok(validHex.test(hexStr), name + ' is not a [0-9a-f]+ hex string')
}

const SERIE = 'jung-und-gott'
const test = tapePromise(tape)

test('generateRawFeed', co.wrap(function* (t) {
	const {meta, items} = yield generateRawFeed(SERIE)

	t.ok(meta, 'meta is missing')
	assertNonEmptyStr(t, meta.title, 'meta.title')
	assertNonEmptyStr(t, meta.description, 'meta.description')
	assertNonEmptyStr(t, meta.site_url, 'meta.site_url') // todo: assert url
	assertNonEmptyStr(t, meta.image_url, 'meta.image_url') // todo: assert url
	t.equal(meta.language, 'de')
	t.equal(meta.generator, pkg.homepage)

	t.ok(Array.isArray(items), 'items is not an array')
	for (let i = 0; i < items.length; i++) {
		const item = items[i]

		t.ok(item, `items[${i}] is missing`)
		assertHexStr(t, item.guid, `items[${i}].guid`)
		assertNonEmptyStr(t, item.url, `items[${i}].url`) // todo: assert url
		assertNonEmptyStr(t, item.title, `items[${i}].title`)
		assertNonEmptyStr(t, item.description, `items[${i}].description`)
		assertNonEmptyStr(t, item.author, `items[${i}].author`)

		t.ok(item.enclosure, `items[${i}].enclosure is missing`)
		// todo: assert url
		assertNonEmptyStr(t, item.enclosure.url, `items[${i}].enclosure.url`)
	}

	// todo: assert if URLs give HTTP 2xx
	t.end()
}))

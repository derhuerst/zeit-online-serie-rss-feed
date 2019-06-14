# zeit-online-serie-rss-feed

**Deprecated. Use `https://newsfeed.zeit.de/serie/name-of-the-series`.**

Generate an RSS feed for [ZEIT Online](https://www.zeit.de/index) Serien articles.

[![npm version](https://img.shields.io/npm/v/zeit-online-serie-rss-feed.svg)](https://www.npmjs.com/package/zeit-online-serie-rss-feed)
[![build status](https://api.travis-ci.org/derhuerst/zeit-online-serie-rss-feed.svg?branch=master)](https://travis-ci.org/derhuerst/zeit-online-serie-rss-feed)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/zeit-online-serie-rss-feed.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install zeit-online-serie-rss-feed
```


## Usage

Identify the slug from the URL of the *Serie* you want to get an RSS feed from. Es an example, the [*Jung und Gott* *Serie*](https://www.zeit.de/serie/jung-und-gott) has the slug `jung-und-gott`.

```js
const serie = 'jung-und-gott'
```

```js
const generateRSSFeed = require('zeit-online-serie-rss-feed')

generateRSSFeed(serie)
.then(console.log)
.catch(console.error)
```

```xml
<?xml version="1.0" encoding="UTF-8"?><rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel><title><![CDATA[Jung und Gott]]></title><description><![CDATA[Wir reden über alles, außer…
```

You can also get the raw data of the feed:

```js
const generateRawFeed = require('zeit-online-serie-rss-feed/raw')

generateRawFeed(serie)
.then(console.log)
.catch(console.error)
```

```js
{
	meta: {
		title: 'Jung und Gott',
		description: 'Wir reden über alles, außer unseren Glauben. Das wollen wir ändern. Woran glauben junge Menschen heute? An Gott, Allah, eine höhere Macht? Oder gar niemanden? Was macht das mit uns? Wir erzählen Geschichte vom glauben, zweifeln, hoffen und verzweifeln.',
		site_url: 'http://www.zeit.de/serie/jung-und-gott',
		image_url: 'http://xml.zeit.de/campus/2017-08/jung-und-gott-serienheader/',
		language: 'de',
		generator: 'https://github.com/derhuerst/zeit-online-serie-rss-feed'
	},
	items: [ {
		guid: '19e2faf1fca3e04f8146ac7e722377d89f1bc8aa16c893b5b5bbc89d3f7fdef2',
		url: 'http://xml.zeit.de/campus/2017-11/atheismus-ostdeutschland-ddr-identifikation-jung-und-gott',
		title: 'Gottlos im Osten',
		description: 'Als ich geboren wurde, war die DDR gerade gestorben. Trotzdem tat ich alles dafür, nicht als Ostdeutscher zu gelten. Nur auf meinen Atheismus bin ich stolz. Warum?',
		author: 'Marcel Laskus',
		enclosure: {
			url: 'http://img.zeit.de/campus/2017-11/atheismus-ostdeutschland-ddr-identifikation-jung-und-gott-ddr-identifikationx/wide__220x124__desktop'
		}
	}, /* … */ ]
}
```


## Contributing

If you have a question or have difficulties using `zeit-online-serie-rss-feed`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/zeit-online-serie-rss-feed/issues).

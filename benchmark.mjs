import stringify from 'json-stringify-deterministic'
import hash from 'stable-hash'
import { escape } from 'base64-url'
import hashObject from 'hash-obj'
import { flattie } from 'flattie'
import bench from 'nanobench'
import crypto from 'node:crypto'

// this is an example of payload
const payload = {
  url: 'https://example.com/',
  query: {
    screenshot: true,
    ttl: 86400000,
    staleTtl: false,
    prerender: 'auto',
    meta: true,
    data: false,
    video: false,
    audio: false,
    pdf: false,
    insights: false,
    iframe: false,
    ping: true,
    headers: {
      'upgrade-insecure-requests': '1',
      dnt: '1',
      accept: '*/*',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-user': '?1',
      'sec-fetch-dest': 'document',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en'
    }
  }
}

/***
 * benchmarking `hash-obj` vs. `stable-hash`
 *
 * The goal is to represent a real use-case. Because that:
 *
 * - ensure the input is flatten
 * - output is base64 URL safe
 * - sha512 is used as algorithm
 *
 */
const getHashOne = obj =>
  escape(
    hashObject(flattie(obj), {
      encoding: 'base64',
      algorithm: 'sha512'
    })
  )

const getHashTwo = obj => {
  return escape(
    crypto
      .createHash('sha512')
      .update(hash(flattie(obj)))
      .digest('base64')
  )
}

const getHashThree = obj => {
  return escape(
    crypto
      .createHash('sha512')
      .update(stringify(flattie(obj)))
      .digest('base64')
  )
}

bench('`hash-obj` 200.000 times', function (b) {
  b.start()

  for (let i = 0; i < 200000; i++) {
    getHashOne(payload)
  }

  b.end()
})

bench('`stable-hash` 200.000 times', function (b) {
  b.start()

  for (let i = 0; i < 200000; i++) {
    getHashTwo(payload)
  }

  b.end()
})

bench('`json-stringify-deterministic` 200.000 times', function (b) {
  b.start()

  for (let i = 0; i < 200000; i++) {
    getHashThree(payload)
  }

  b.end()
})

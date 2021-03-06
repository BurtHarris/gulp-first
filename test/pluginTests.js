/* global describe, it */
var assert = require('assert')
var es = require('event-stream')
var first = require('../')

describe('event-stream', function () {
  it('should generate two data events if two objects provided', function (done) {
    var count = 0
    es.readArray([{ name: 'first' }, { name: 'second' }])
            .on('data', function (data) { count++ })
            .on('end', function () {
              assert.equal(count, 2, 'unexpected object count')
              done()
            })
  })
})

describe('gulp-first', function () {
  it('should output nothing if nothing put in', function (done) {
    var count = 0
    es.readArray([])
            .pipe(first())
            .on('data', function (data) { count++ })
            .on('end', function () {
              assert.equal(count, 0, 'unexpected object count')
              done()
            })
  })

  it('should output one object if one object put in', function (done) {
    var count = 0
    es.readArray([{ name: 'first' }])
            .pipe(first())
            .on('data', function (data) { count++; assert(data.name, 'fist') })
            .on('end', function () {
              assert.equal(count, 1, 'unexpected object count')
              done()
            })
  })

  it('should output only one object if two objects put in', function (done) {
    var count = 0
    es.readArray([{ name: 'first' }, { name: 'second' }])
            .pipe(first())
            .on('data', function (data) { count++; assert(data.name, 'fist') })
            .on('end', function () {
              assert.equal(count, 1, 'unexpected object count')
              done()
            })
  })
})

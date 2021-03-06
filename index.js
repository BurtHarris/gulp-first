const through = require('through2') // through2 is a thin wrapperof  transform streams

// Plugin level function(dealing with files or any arbitrary object)
function first () {
  var isFirst = true

  return through.obj(function (file, enc, cb) {
    if (isFirst) {
      isFirst = false
      this.push(file)
      // previously called this.end() here in an attempt
      // to optimize by letting earlier stages in pipeline
      // know that no further input was desired.   This
      // lead to issue #1, so I'm opting for simple rather than
      // optimal.
    }
    cb()
  })
}

// Exporting the plugin main function
module.exports = first

const through = require('through2') // through2 is a thin wrapperof  transform streams

// Plugin level function(dealing with files or any arbitrary object)
function first () {
  var isFirst = true

  return through.obj(function (file, enc, cb) {
    if (isFirst) {
      isFirst = false
      this.push(file)
      this.end()
    }
    cb()
  })
}

// Exporting the plugin main function
module.exports = first

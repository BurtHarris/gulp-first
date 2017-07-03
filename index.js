const through = require('through2') // through2 is a thin wrapperof  transform streams

// Plugin level function(dealing with files or any arbitrary object)
function first () {
  return through.obj(function (file, enc, cb) {
    this.end()
    cb(null, file)
  })
}

// Exporting the plugin main function
module.exports = first

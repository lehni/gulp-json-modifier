var deepmerge = require('deepmerge');
var through = require('through2');
var PluginError = require('plugin-error');

module.exports = function(modify, options) {
  options = options || {};

  if (typeof modify !== 'function') {
    if (typeof modify === 'object') {
      var object = modify;
      // edit JSON object by merging with user specific object
      modify = function(json) {
        return deepmerge(json, object, options.merge || {});
      };
    } else {
      throw new PluginError('gulp-json-editor-simple', '"modify" option must be a function or object');
    }
  }

  return through.obj(function(file, encoding, callback) {

    // ignore it
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    // stream is not supported
    if (file.isStream()) {
      this.emit('error',
        new PluginError('gulp-json-editor-simple', 'Streaming is not supported'));
      return callback();
    }

    try {
      // edit JSON object and get it as string notation
      var json = JSON.stringify(
        modify(JSON.parse(file.contents.toString('utf8'))),
        null,
        options.indent != null ? options.indent : 2
      );

      // write it to file
      file.contents = Buffer.from(json);
    } catch (err) {
      this.emit('error', new PluginError('gulp-json-editor', err));
    }

    this.push(file);
    callback();
  });
};

var jsonModifier = require('../');
var gulp = require('gulp');

it('should pass-through second argument to js-beautify', function(done) {

  var stream = gulp.src('test/test.json').pipe(jsonModifier({
    version: '2.0.0',
    description: 'this is test',
    array: [
      '1234567890', '1234567890', '1234567890', '1234567890',
      '1234567890', '1234567890', '1234567890', '1234567890',
    ],
    nested: {
      version: '2.0.1',
      description: 'this is test for nested',
    },
  },
  {
    indent: 3
  }));

  stream.on('data', function(file) {
    var expected =
      '{\n' +
      '   "name": "test object",\n' +
      '   "version": "2.0.0",\n' +
      '   "nested": {\n' +
      '      "name": "nested object",\n' +
      '      "version": "2.0.1",\n' +
      '      "description": "this is test for nested"\n' +
      '   },\n' +
      '   "authors": [\n' +
      '      "tom"\n' +
      '   ],\n' +
      '   "description": "this is test",\n' +
      '   "array": [\n' +
      '      "1234567890",\n' +
      '      "1234567890",\n' +
      '      "1234567890",\n' +
      '      "1234567890",\n' +
      '      "1234567890",\n' +
      '      "1234567890",\n' +
      '      "1234567890",\n' +
      '      "1234567890"\n' +
      '   ]\n' +
      '}';

    file.contents.toString().should.eql(expected);
    done();
  });
});

it('should pass-through deepmerge options and do an overwriteMerge', function(done) {

  var stream = gulp.src('test/test.json').pipe(jsonModifier({
    authors: ['tomcat'],
  }, {
    merge: {
      arrayMerge: function(dist,source) {
        return source;
      }
    }
  }));

  stream.on('data', function(file) {
    var expected =
       '{\n' +
       '  "name": "test object",\n' +
       '  "version": "1.0.0",\n' +
       '  "nested": {\n' +
       '    "name": "nested object",\n' +
       '    "version": "1.0.0"\n' +
       '  },\n' +
       '  "authors": [\n' +
       '    "tomcat"\n' +
       '  ]\n' +
       '}';
    file.contents.toString().should.eql(expected);
    done();
  });
});

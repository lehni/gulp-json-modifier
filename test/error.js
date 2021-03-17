var jsonModifier = require('../');
var fs = require('fs');
var File = require('vinyl');
var should = require('should');

it('should raise error when missing option', function(done) {
  should(function() { jsonModifier(); })
    .throw('"modify" option must be a function or object');
  done();
});


it('should raise error when invalid type of option', function(done) {
  should(function() { jsonModifier(1); })
    .throw('"modify" option must be a function or object');
  done();
});


it('should do path-through when input is null', function(done) {
  jsonModifier({})
    .on('data',  function(file) {
      should(file.contents).eql(null);
      done();
    })
    .write(new File({}));
});


it('should raise error when streaming input', function(done) {
  jsonModifier({})
    .on('error', function(err) {
      err.message.should.equal('Streaming is not supported');
      done();
    })
    .write(new File({
      contents: fs.createReadStream('test/test.json'),
    }));
});

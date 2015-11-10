var expect = require('expect.js');

var ifconfig = require('../lib/ifconfig');

describe('ifconfig', function() {
  var parsed, error;

  var isBoolean = function(value) {
    return [true, false].indexOf(value) !== -1;
  }

  before(function(done) {
    ifconfig()
      .then(function(out) {
        parsed = out;
      }, function(err) {
        error = err;
      }).then(done);
  });

  it('does not error', function() {
    expect(error).to.be(undefined);
  });

  it('returns an array (promise)', function() {
    expect(parsed).to.be.a(Array);
  });

  it('returns elements with device and active state', function() {
    parsed.forEach(function(item) {
      expect(item.device).to.match(/[a-z0-9]/);
      expect(isBoolean(item.active)).to.be.ok();
    });
  });
});

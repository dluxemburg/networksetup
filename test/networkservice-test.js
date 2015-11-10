var expect = require('expect.js');

var networkservice = require('../lib/networkservice');

describe('networkservice', function() {
  var parsed, error;

  before(function(done) {
    networkservice()
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

  it('returns elements with name, index, port, and device', function() {
    parsed.forEach(function(item) {
      expect(item).to.only.have.keys('name', 'index', 'port', 'device');
    });
  });
});

var expect = require('expect.js');

var active = require('../lib/active');

describe('active', function() {
  var result, error;

  before(function(done) {
    active()
      .then(function(out) {
        result = out;
      }, function(err) {
        error = err;
      }).then(done);
  });

  it('does not error', function() {
    expect(error).to.be(undefined);
  });

  it('returns one interface', function() {
    expect(result).to.not.be.a(Array);
  });

  it('the interface has a name, index, port, and device', function() {
    expect(result).to.only.have.keys('name', 'index', 'port', 'device');
  });
});

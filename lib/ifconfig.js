var denodeify = require('denodeify');
var exec = require('child_process').exec;

module.exports = function ifconfig() {
  return denodeify(exec)('ifconfig').then(function(result) {
    return result.split("\n").reduce(function(memo, line) {
      var device = line.match(/^(\w+):\s+(.*)/);
      var status = line.trim().match(/^status:\s(.*)/);
      if (device) memo.push({device: device[1]});
      if (status) {
        memo[memo.length - 1].active = status[1] === 'active';
      }
      return memo;
    }, []).filter(function(service) {
      return service.active !== undefined;
    });
  });
};

var denodeify = require('denodeify');
var exec = require('child_process').exec;

module.exports = function networkservice() {
  return denodeify(exec)('networksetup -listnetworkserviceorder')
    .then(function(result) {
      var result = result.split("\n").reduce(function(memo, line) {
        var service = line.match(/^\((\d+)\)\s+(.*)$/);
        var description = line.match(/^\(Hardware Port: (.+), Device: ([a-z0-9]+)\)$/);
        if (service) {
          memo.push({name: service[2], index: parseInt(service[1])});
        }
        if (description) {
          memo[memo.length - 1].port = description[1];
          memo[memo.length - 1].device = description[2];
        }
        return memo;
      }, []).filter(function(item) {
        return item.name && item.index && item.port && item.device;
      });
      return result;
    });
};

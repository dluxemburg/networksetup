var ifconfig = require('./ifconfig');
var networkservice = require('./networkservice');

module.exports = function active() {
  return Promise.all([ifconfig(), networkservice()])
    .then(function(resolved) {
      var activeDevices = resolved[0].reduce(function(memo, item) {
        memo[item.device] = item.active; return memo;
      }, {});
      return resolved[1].filter(function(item) {
        return activeDevices[item.device];
      }).shift();
    });
}

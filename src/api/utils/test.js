var RedisSMQ = require("rsmq");
var rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );


rsmq.listQueues(function (err, resp) {
  console.log(resp)
  });
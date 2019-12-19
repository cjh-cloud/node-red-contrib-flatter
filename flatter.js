var flatten = require('flat');

module.exports = function(RED) {
    function FlatterNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg) {
            msg.payload = flatten(msg.payload);
            node.send(msg);
        });
    }
    RED.nodes.registerType("flat", FlatterNode);
}
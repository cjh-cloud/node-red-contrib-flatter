var unflatten = require('flat').unflatten;

module.exports = function(RED) {
    function UnflatterNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.on('input', function(msg) {
            if (typeof msg.payload === 'object' && msg.payload !== null) {
                msg.payload = unflatten(msg.payload);
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("unflat", UnflatterNode);
}
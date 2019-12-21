var should = require("should");
var helper = require("node-red-node-test-helper");
var flatterNode = require("../flatter");
var unflatterNode = require("../unflatter")

helper.init(require.resolve('node-red'));

describe('flat Node', function () {

    beforeEach(function (done) {
        helper.startServer(done);
    });

    afterEach(function (done) {
        helper.unload();
        helper.stopServer(done);
    });

    it('should be loaded', function (done) {
        var flow = [{ id: "n1", type: "flat", name: "flat" }];
        helper.load(flatterNode, flow, function () {
            var n1 = helper.getNode("n1");
            n1.should.have.property('name', 'flat');
            done();
        });
    });

    it('should make payload flat', function (done) {
        var flow = [{ id: "n1", type: "flat", name: "flat",wires:[["n2"]] },
        { id: "n2", type: "helper" }];
        helper.load(flatterNode, flow, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");

            var original = {"key1":{"keyA":"valueI"},"key2":{"keyB":"valueII"},"key3":{"a":{"b":{"c":[1,{"d":2}]}}}};
            var flattened = {"key1.keyA":"valueI","key2.keyB":"valueII","key3.a.b.c.0":1,"key3.a.b.c.1.d":2};

            n2.on("input", function (msg) {
                msg.should.have.property('payload', flattened); // Expected result
                done();
            });
            n1.receive({ payload: original }); // Input into the node
        });
    });

    it('should make payload unflat', function (done) {
        var flow = [{ id: "n1", type: "unflat", name: "unflat",wires:[["n2"]] },
        { id: "n2", type: "helper" }];
        helper.load(unflatterNode, flow, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");

            var original = {"key1":{"keyA":"valueI"},"key2":{"keyB":"valueII"},"key3":{"a":{"b":{"c":[1,{"d":2}]}}}};
            var flattened = {"key1.keyA":"valueI","key2.keyB":"valueII","key3.a.b.c.0":1,"key3.a.b.c.1.d":2};

            n2.on("input", function (msg) {
                msg.should.have.property('payload', original); // Expected result
                done();
            });
            n1.receive({ payload: flattened }); // Input into the node
        });
    });

    it('flat should not change non-objects: strings', function (done) {
        var flow = [{ id: "n1", type: "flat", name: "flat",wires:[["n2"]] },
        { id: "n2", type: "helper" }];
        helper.load(flatterNode, flow, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");

            var original = "foo";
            var flattened = "foo";

            n2.on("input", function (msg) {
                msg.should.have.property('payload', flattened); // Expected result
                done();
            });
            n1.receive({ payload: original }); // Input into the node
        });
    });

    it('unflat should not change non-objects: strings', function (done) {
        var flow = [{ id: "n1", type: "unflat", name: "unflat",wires:[["n2"]] },
        { id: "n2", type: "helper" }];
        helper.load(unflatterNode, flow, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");

            var original = "foo";
            var flattened = "foo";

            n2.on("input", function (msg) {
                msg.should.have.property('payload', original); // Expected result
                done();
            });
            n1.receive({ payload: flattened }); // Input into the node
        });
    });

    it('flat should not change non-objects: integers', function (done) {
        var flow = [{ id: "n1", type: "flat", name: "flat",wires:[["n2"]] },
        { id: "n2", type: "helper" }];
        helper.load(flatterNode, flow, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");

            var original = 1;
            var flattened = 1;

            n2.on("input", function (msg) {
                msg.should.have.property('payload', flattened); // Expected result
                done();
            });
            n1.receive({ payload: original }); // Input into the node
        });
    });

    it('unflat should not change non-objects: integers', function (done) {
        var flow = [{ id: "n1", type: "unflat", name: "unflat",wires:[["n2"]] },
        { id: "n2", type: "helper" }];
        helper.load(unflatterNode, flow, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");

            var original = 1;
            var flattened = 1;

            n2.on("input", function (msg) {
                msg.should.have.property('payload', original); // Expected result
                done();
            });
            n1.receive({ payload: flattened }); // Input into the node
        });
    });

    // A null value will return an error with the flat library
    it('flat should not change null', function (done) {
        var flow = [{ id: "n1", type: "flat", name: "flat",wires:[["n2"]] },
        { id: "n2", type: "helper" }];
        helper.load(flatterNode, flow, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");

            var original = null;
            var flattened = null;

            n2.on("input", function (msg) {
                msg.should.have.property('payload', flattened); // Expected result
                done();
            });
            n1.receive({ payload: original }); // Input into the node
        });
    });

    it('unflat should not change null', function (done) {
        var flow = [{ id: "n1", type: "unflat", name: "unflat",wires:[["n2"]] },
        { id: "n2", type: "helper" }];
        helper.load(unflatterNode, flow, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");

            var original = null;
            var flattened = null;

            n2.on("input", function (msg) {
                msg.should.have.property('payload', original); // Expected result
                done();
            });
            n1.receive({ payload: flattened }); // Input into the node
        });
    });

});
const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

dc = new DriverRemoteConnection('wss://mapping-graph-db.cluster-cgm0q33taffj.us-east-2.neptune.amazonaws.com:8182/gremlin', {});

const graph = new Graph();
const g = graph.traversal().withRemote(dc);

g
    .E('e1').aggregate('x')
    .V('tcp').aggregate('x')
    .V('tcp-tenant-abc').aggregate('x')
    .select('x').unfold().drop()
    .next().then((data) => {
        dc.close();
        console.log(data);
    });

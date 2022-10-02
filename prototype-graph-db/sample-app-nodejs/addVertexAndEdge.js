const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

dc = new DriverRemoteConnection('wss://mapping-graph-db.cluster-cgm0q33taffj.us-east-2.neptune.amazonaws.com:8182/gremlin', {});

const graph = new Graph();
const g = graph.traversal().withRemote(dc);


const saveData = async () => {
    const { t: { id } } = gremlin.process;
    let result1 = await g.addV('sor').property(id, 'tcp').property('name', 'TCP').next();
    let result2 = await g.addV('sor-tenant').property(id, 'tcp-tenant-abc').property('name', 'abc').next();
    let result3 = await g.
        V('tcp').as('a').
        V('tcp-tenant-abc').as('b').
        addE('contains-tenant').
        from_('a').to('b').
        property(id, "e1").next();
    return {
        statusCode: 201,
        body: JSON.stringify({ message: "Testing Gremlin!", data: [result1, result2, result3] }),
    };
}

const saveTransaction = async () => {
    const { t: { id } } = gremlin.process;
    let result = await g
        .addV('sor').property(id, 'tcp').property('name', 'TCP').as('a')
        .addV('sor-tenant').property(id, 'tcp-tenant-abc').property('name', 'abc').as('b')
        .addE('contains-tenant').
        from_('a').to('b').
        property(id, "e1").iterate();

    return {
        statusCode: 201,
        body: JSON.stringify({ message: "Testing Gremlin!", data: [result] }),
    };
}

//saveTransaction().then((data) => {
saveData().then((data) => {
    dc.close();
    console.log(data);
});

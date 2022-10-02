const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

dc = new DriverRemoteConnection('wss://mapping-graph-db.cluster-cgm0q33taffj.us-east-2.neptune.amazonaws.com:8182/gremlin', {});

const graph = new Graph();
const g = graph.traversal().withRemote(dc);

const fetchItems = async () => {
    const data = await g.V().toList();

    for (const v of data) {
        const _properties = await g.V(v.id).properties().toList();
        console.log(`${v.id} - ${v.label} - ${_properties}`);
    }
};

fetchItems().then(() => {
    dc.close();
});

///// more query samples

// // list out all vertices
// g.V()

// //list out all edges
// g.E()

// // get details of a vertex
// g.V('tcp').properties('name')

// // give all the edges of vertex 'tcp'
// g.V('tcp').outE()

// // give names of vertices which are (out) related as "contains-tenant" from vertex 'tcp'
// g.V('tcp').outE('contains-tenant').inV().properties('name')

// // list out entity edges of tenant 'abc' of sor 'tcp'
// g.V('tcp').outE('contains-tenant').inV().has('name', 'abc').outE('contains-entity')

// // list out entity record ids of tenant 'abc' of sor 'tcp'
// g.V('tcp').outE('contains-tenant').inV().has('name', 'abc').outE('contains-entity').inV().properties('recordId')

// // get tenant record id of an external system entity record id
// g.V('paycor').outE('contains-ext-entity').inV().has('recordId', 'p102').outE('belongs-to').inV().properties('recordId')

// // list out external system records of tenant entity
// g.V('tcp').outE('contains-tenant').inV().has('name', 'abc').outE('contains-entity').inV().has('recordId', '101').outE('maps-to').inV()

// // list out external system records of mutiple tenant entities
// g.V('tcp').outE('contains-tenant').inV().has('name', 'abc').outE('contains-entity').inV().has('recordId', within('101', '102')).outE('maps-to').inV()

// // list out type of entities of a given tenant
// g.V('tcp').outE('contains-tenant').inV().has('name', 'abc').outE('contains-entity').inV().label().dedup()

// // list out tenant entities of type employee
// g.V('tcp').outE('contains-tenant').inV().has('name', 'abc').outE('contains-entity').inV().hasLabel('employee')

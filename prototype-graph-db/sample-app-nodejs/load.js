const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

dc = new DriverRemoteConnection('wss://mapping-graph-db.cluster-cgm0q33taffj.us-east-2.neptune.amazonaws.com:8182/gremlin', {});

const graph = new Graph();
const g = graph.traversal().withRemote(dc);


// // FROM: https://tinkerpop.apache.org/docs/current/reference/#gremlin-javascript-transactions
// // DOESN'T WORK 
// const doIt = async () => {
//     const tx = g.tx(); // create a Transaction

//     const gtx = tx.begin();
//     return Promise.all([
//         gtx.addV("person").property("name", "jorge").iterate(),
//         gtx.addV("person").property("name", "josh").iterate()
//     ])
// }

const addVertices = async (items) => {
    let promiseAry = [];
    const { t: { id } } = gremlin.process;

    for (const item of items) {
        let newItem = g.addV(item.label);

        Object.keys(item).forEach(key => {
            switch (key) {
                case "id":
                    //system prop
                    newItem.property(id, item.id);
                    break;
                case "label":
                    //it was already added. don't do any
                    break;
                default:
                    newItem.property(key, item[key]);
            }

        });
        promiseAry.push(await newItem.next());
    }
    return Promise.all(promiseAry);
}

const addEdges = async (items) => {
    let promiseAry = [];
    const { t: { id } } = gremlin.process;

    for (const item of items) {
        let newItem = g.
            V(item.from).as('a').
            V(item.to).as('b').
            addE(item.label).
            from_('a').to('b').
            property(id, item.id);

        //let newItem = g.V(item.from).as('a').addE(item.label).to(item.to);

        Object.keys(item).forEach(key => {
            switch (key) {
                case "id", "label", "from", "to":
                    //it was already added. don't do any
                    break;
                default:
                    newItem.property(key, item[key]);
            }

        });
        promiseAry.push(await newItem.next());
    }
    return Promise.all(promiseAry);
}



const vertices = [
    { id: "tcp", name: "TCP", label: "sor" },
    { id: "tcp-tenant-abc", name: "abc", label: "sor-tenant" },
    { id: "tcp-tenant-xyz", name: "xyz", label: "sor-tenant" },
    { id: "paycor", name: "Paycor", label: "ext-system" },
    { id: "bcbs", name: "BCBS", label: "ext-system" },
    { id: "tcp-tenant-abc-employee-101", recordId: "101", label: "employee" },
    { id: "tcp-tenant-abc-employee-102", recordId: "102", label: "employee" },
    { id: "tcp-tenant-xyz-employee-201", recordId: "201", label: "employee" },
    { id: "tcp-tenant-abc-jc-1001", recordId: "1001", label: "jobcode" },
    { id: "tcp-tenant-abc-jc-1002", recordId: "1002", label: "jobcode" },
    { id: "paycor-p101", recordId: "p101", label: "ext-record" },
    { id: "paycor-p102", recordId: "p102", label: "ext-record" },
    { id: "paycor-p201", recordId: "p201", label: "ext-record" },
    { id: "bcbs-b101", recordId: "b101", label: "ext-record" },
    { id: "bcbs-b102", recordId: "b102", label: "ext-record" },
    { id: "bcbs-b201", recordId: "b201", label: "ext-record" }
];

const edges = [
    { id: "e1", from: "tcp", to: "tcp-tenant-abc", label: "contains-tenant" },
    { id: "e2", from: "tcp", to: "tcp-tenant-xyz", label: "contains-tenant" },
    { id: "e3", from: "tcp-tenant-abc", to: "tcp-tenant-abc-employee-101", label: "contains-entity" },
    { id: "e4", from: "tcp-tenant-abc", to: "tcp-tenant-abc-employee-102", label: "contains-entity" },
    { id: "e5", from: "tcp-tenant-xyz", to: "tcp-tenant-xyz-employee-201", label: "contains-entity" },
    { id: "e6", from: "tcp-tenant-abc", to: "tcp-tenant-abc-jc-1001", label: "contains-entity" },
    { id: "e7", from: "tcp-tenant-abc", to: "tcp-tenant-abc-jc-1002", label: "contains-entity" },
    { id: "e8", from: "paycor", to: "paycor-p101", label: "contains-ext-entity" },
    { id: "e9", from: "paycor", to: "paycor-p102", label: "contains-ext-entity" },
    { id: "e10", from: "paycor", to: "paycor-p201", label: "contains-ext-entity" },
    { id: "e11", from: "bcbs", to: "bcbs-b101", label: "contains-ext-entity" },
    { id: "e12", from: "bcbs", to: "bcbs-b102", label: "contains-ext-entity" },
    { id: "e13", from: "bcbs", to: "bcbs-b201", label: "contains-ext-entity" },
    { id: "e14", from: "paycor-p101", to: "tcp-tenant-abc-employee-101", label: "belongs-to" },
    { id: "e15", from: "paycor-p102", to: "tcp-tenant-abc-employee-102", label: "belongs-to" },
    { id: "e16", from: "paycor-p201", to: "tcp-tenant-xyz-employee-201", label: "belongs-to" },
    { id: "e17", from: "bcbs-b101", to: "tcp-tenant-abc-employee-101", label: "belongs-to" },
    { id: "e18", from: "bcbs-b102", to: "tcp-tenant-abc-employee-102", label: "belongs-to" },
    { id: "e19", from: "bcbs-b201", to: "tcp-tenant-xyz-employee-201", label: "belongs-to" },
    { id: "e20", from: "tcp-tenant-abc-employee-101", to: "paycor-p101", label: "maps-to" },
    { id: "e21", from: "tcp-tenant-abc-employee-102", to: "paycor-p102", label: "maps-to" },
    { id: "e22", from: "tcp-tenant-xyz-employee-201", to: "paycor-p201", label: "maps-to" },
    { id: "e23", from: "tcp-tenant-abc-employee-101", to: "bcbs-b101", label: "maps-to" },
    { id: "e24", from: "tcp-tenant-abc-employee-102", to: "bcbs-b102", label: "maps-to" },
    { id: "e25", from: "tcp-tenant-xyz-employee-201", to: "bcbs-b201", label: "maps-to" }
];


//doIt().then(() => { //DOESN'T WORK
addVertices(vertices).then(() => {
    console.log("---Vertices added!")
    addEdges(edges).then(() => {
        dc.close();
        console.log("---Edges added!")
    }).catch(err => {
        dc.close();
        console.log("ERROR adding Edges!")
        console.log(err);
    });
}).catch(err => {
    dc.close();
    console.log("ERROR adding Vertices!")
    console.log(err);
});

const { t: { id } } = gremlin.process;




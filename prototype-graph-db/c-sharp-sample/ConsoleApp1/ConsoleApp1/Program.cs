using System;
using Gremlin.Net.Driver;
using Gremlin.Net.Driver.Remote;
using Gremlin.Net.Process.Traversal;
using Gremlin.Net.Structure;

namespace ConsoleApp1
{
    class Program
    {

        //static void Main(string[] args)
        //{
        //    var endpoint = "mapping-graph-db.cluster-cgm0q33taffj.us-east-2.neptune.amazonaws.com";
        //    var gremlinServer = new GremlinServer(endpoint, 8182, enableSsl: true);
        //    var gremlinClient = new GremlinClient(gremlinServer);
        //    var remoteConnection = new DriverRemoteConnection(gremlinClient, "g");
        //    var g = AnonymousTraversalSource.Traversal().WithRemote(remoteConnection);

        //    //g.AddV("Person").Property("Name", "Justin").Iterate();
        //    //g.AddV("Custom Label").Property("name", "Custom id vertex 1").Iterate();
        //    //g.AddV("Custom Label").Property("name", "Custom id vertex 2").Iterate();
        //    //var output = g.V().Limit<Vertex>(3).ToList();
        //    //foreach (var item in output)
        //    //{
        //    //    Console.WriteLine(item);
        //    //}

        //    remoteConnection.Dispose();
        //    Console.ReadLine();
        //}


        static void Main(string[] args)
        {
            var endpoint = "mapping-graph-db.cluster-cgm0q33taffj.us-east-2.neptune.amazonaws.com";
            var gremlinServer = new GremlinServer(endpoint, 8182, enableSsl: true);
            var gremlinClient = new GremlinClient(gremlinServer);
            var remoteConnection = new DriverRemoteConnection(gremlinClient, "g");
            var g = AnonymousTraversalSource.Traversal().WithRemote(remoteConnection);

            DoTransaction(g);

            Console.WriteLine("Done!");
            remoteConnection.Dispose();
            Console.ReadLine();
        }

        //FROM https://tinkerpop.apache.org/docs/current/reference/#gremlin-dotnet-transactions
        // DOESN'T WORK
        static async void DoTransaction(GraphTraversalSource g)
        {
            var tx = g.Tx();    // create a transaction

            // spawn a new GraphTraversalSource binding all traversals established from it to tx
            var gtx = tx.Begin();

            // execute traversals using gtx occur within the scope of the transaction held by tx. the
            // tx is closed after calls to CommitAsync or RollbackAsync and cannot be re-used. simply spawn a
            // new Transaction from g.Tx() to create a new one as needed. the g context remains
            // accessible through all this as a sessionless connection.
            try
            {
                await gtx.AddV("person").Property("name", "jorge").Promise(t => t.Iterate());
                await gtx.AddV("person").Property("name", "josh").Promise(t => t.Iterate());


                await tx.CommitAsync();
            }
            catch (Exception ex)
            {
                await tx.RollbackAsync();
            }
        }


    }
}

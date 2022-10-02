# PoC - Working with Graph Db

The goal is to quickly implement a proof-of-concept in order to learn the pros/cons of **Amazon Neptune** for Integration / Mapping service.

> **Note:** The steps / walkthrough mentioned in this document is for development purposes only and not to be followed as-is for production.

- [Quick Concepts](/guides/quick-concepts.md)
- [Sample Implementation](/guides/sample-implementation.md)
  - [Sample Graph Model](/guides/sample-implementation.md#sample-graph-model--data)
  - [Walkthrough - Getting Started](/guides/sample-implementation.md#walkthrough---getting-started)
  - [Pre-requisites](/guides/sample-implementation.md#pre-requisites)
  - [Creating Neptune Db](/guides/sample-implementation.md#create-neptune-graph-db)
  - [Create AWS Role and associate it to Neptune Db](/guides/sample-implementation.md#create-aws-role-and-associate-it-to-neptune-db)
  - [Create Jupyter Notebook](/guides/sample-implementation.md#create-jupyter-notebook)
  - [Create S3 bucket and upload data files](/guides/sample-implementation.md#create-s3-bucket-and-upload-data-files)
  - [Configure Security group](/guides/sample-implementation.md#configure-security-group)
  - [Create EC2 Bastion Server](/guides/sample-implementation.md#create-ec2-bastion-server)
  - [Apply permissions to .pem file](/guides/sample-implementation.md#apply-permissions-to-pem-file)
  - [Create VPC Endpoint (for S3)](/guides/sample-implementation.md#create-vpc-endpoint-for-s3)
  - [Connect to EC2 using SSH](/guides/sample-implementation.md#connect-to-ec2-using-ssh)
  - [Develop from local machine](/guides/sample-implementation.md#develop-from-local-machine)
  - [Develop from local machine](/guides/sample-implementation.md#develop-from-local-machine)
  - [Bulk upload data using S3](/guides/sample-implementation.md#bulk-upload-data-using-s3)
  - [Using Jupyter Notebook for querying / visualization](/guides/sample-implementation.md#using-jupyter-notebook-for-querying--visualization)
- [Mapping Service PoC](/guides/mapping-service-poc.md)
  - [Graph Model / Data](/guides/mapping-service-poc.md#graph-model--data)
  - [Relationship/Visualization Samples](/guides/mapping-service-poc.md#relationship-diagram-samples)
  - [Code Samples](/guides/mapping-service-poc.md#code-samples)
  - [Gremlin Samples](/guides/mapping-service-poc.md#gremlin-samples)

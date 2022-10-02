### Demo

An example on how to fetch list of S3 bucket names demonstrating the following:

- using AWS SAM CLI
- using AWS SDK in node.js (install using "npm install")
- separate logic into multiple files (not just lambda handler alone)
- handcrafted "template.yaml" (separated AWI gateway as a resource on its own)
- adding permissions through template
- created files manually without using "sam init" command (used "npm init" for package.json)

NOTE: this uses concepts from previous examples

#### Heads-up

- Env: Win 10
- Needs AWS CLI and AWS SAM CLI installed / configured
- Needs Docker Desktop installed
- Needs Node.js/NPM installed
- AWS CLI version: 2.4.9
- SAM CLI version: 1.37.0
- Node version: 14.18.1
- NPM version: 6.14.15

#### Commands

- use following command to build

`> sam build`

- use following command to test lambda locally

`> sam local invoke`
or
`> sam local invoke --log-file log.txt`

- use following command to http api locally (using browser)

`> sam local start-api --port 3000`

#### Debugging using VSCode

We can still debug/troubleshoot using VSCode (as explained in previous examples)

- for lambda
  `> sam local invoke -d 9999 DemoListS3BucketsLambda`

- for http api
  `> sam local start-api --port 3000 --debug-port 9999`

#### Deploy to AWS cloud

- This uses CloudFormation, S3 and other service behind the scenes
- create an S3 bucket (ex: jag-lambda-apps)
- use following command to deploy (using powershell)

```
sam deploy `
 --template-file template.yaml `
 --stack-name demo-list-s3-buckets `
 --s3-bucket jag-lambda-apps `
 --region us-east-2 `
 --capabilities CAPABILITY_IAM

```

- once deployed, you can check / test using AWS Console

#### Delete from AWS

- use following command to delete it from AWS cloud

`> sam delete --stack-name demo-list-s3-buckets`

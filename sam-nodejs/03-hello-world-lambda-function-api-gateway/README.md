### Demo

A simple example on how to use AWS SAM CLI to build and test locally, an AWS Lambda function along with HTTP API support.

#### Heads-up

- Env: Win 10
- Needs AWS CLI and AWS SAM CLI installed / configured
- Needs Docker Desktop installed
- Needs Node.js/NPM installed
- AWS CLI version: 2.4.9
- SAM CLI version: 1.37.0
- Node version: 14.18.1
- NPM version: 6.14.15
- handcrafted "template.yaml"
- created files manually without using "sam init" command (used "npm init" for package.json)

#### Build

- use following command to build

`> sam build`

- Once built, it creates ".aws-sam" folder

#### Test just the Lambda function locally (without HTTP API)

- use following command to test it

`> sam local invoke "HelloWorldFunction"`

- should return following output:

```
...
{"statusCode":200,"body":"Hello World!"}
```

#### Test GET operation on HTTP API backed with Lambda function

- use following command to start web server

`sam local start-api --port 9998`

- open browser and point to "http://localhost:9998"
- should see "Hello World!" as result
- use Ctrl+C to cancel the server

#### Deploy to AWS cloud

- This uses CloudFormation, S3 and other service behind the scenes
- create an S3 bucket (ex: jag-lambda-apps)
- use following command to deploy (using powershell)

```
sam deploy `
--template-file template.yaml `
--stack-name hello-world-api `
--s3-bucket jag-lambda-apps `
--region us-east-2 `
--capabilities CAPABILITY_IAM

```

- once deployed, open AWS Console | API Gateway | APIs
- you should see "hello-world-api" in the list. Click on name to open it. (01.png)
- select "stages" from left menu and choose Prod / Stage | GET to see invoke url
- the url would look similar to following (02.png):

`https://hyvq9ubkyb.execute-api.us-east-2.amazonaws.com/Prod/`

- open new tab and use above url to get the output "Hello World!" (03.png)

#### Delete from AWS

- use following command to delete it from AWS cloud

`> sam delete --stack-name hello-world-api`

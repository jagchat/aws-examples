### Demo

A simple example on how to use AWS SAM CLI to build and test an AWS Lambda function locally. Further, we are going to deploy/delete lambda function directly from AWS cloud. Following are the steps.

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

#### Test it locally

- use following command to test it locally

`> sam local invoke`

- we can even push logs / output to separate file with the following

`> sam local invoke --log-file log.txt`

- should return following output:

```
START RequestId: 03d39ff8-8731-4fb9-9329-39170940d9d0 Version: $LATEST
END RequestId: 03d39ff8-8731-4fb9-9329-39170940d9d0
REPORT RequestId: 03d39ff8-8731-4fb9-9329-39170940d9d0 Init Duration: 0.31 ms Duration: 85.08 ms Billed Duration: 86 ms Memory Size: 128 MB Max Memory Used: 128 MB
"Hello World!"
```

#### Deploy to AWS cloud

- This uses CloudFormation, S3 and other service behind the scenes
- create an S3 bucket (ex: jag-lambda-apps)
- use following command to deploy (using powershell)

```
sam deploy `
--template-file template.yaml `
--stack-name hello-world `
--s3-bucket jag-lambda-apps `
--region us-east-2 `
--capabilities CAPABILITY_IAM

```

- once deployed, you can check / test using AWS Console

#### Delete from AWS

- use following command to delete it from AWS cloud

`> sam delete --stack-name hello-world`

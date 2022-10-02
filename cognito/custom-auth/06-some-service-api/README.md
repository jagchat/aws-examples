## Demo

An example on how to do math operation using AWS Lambda and API Gateway. The sampels demonstrate the following:

- using AWS SAM CLI
- using AWS SDK in node.js (install using "npm install")
- handcrafted multiple template (yaml) files for different types of deployments

NOTE: this uses concepts from previous examples

### Heads-up

- Env: Win 10
- Needs AWS CLI and AWS SAM CLI installed / configured
- Needs Docker Desktop installed
- Needs Node.js/NPM installed
- AWS CLI version: 2.4.9
- SAM CLI version: 1.37.0
- Node version: 14.18.1
- NPM version: 6.14.15

### Steps to deploy / test

#### How to Build

- use following command to build all parts of application

`> sam build --template-file template-all.yaml`

#### How to test read operation (get-sum) locally

- in order to test "get-sum" function locally, we can use the following command:

```
sam local invoke DemoMathGetSumLambda `
 --template-file template-all.yaml `
 --event ../sample-data/get-sum-input.json `
 --log-file log.txt
```

- in order to test "get-sum" http api locally (using browser)

```
sam local start-api `
--template-file template-all.yaml `
--port 3000
```

- the above kicks off a web server at port 3000 and we can test the functionality by pointing our browser to

`http://localhost:3000/sum/10/20`

#### Debugging using VSCode (applies to all operations)

We can still debug/troubleshoot using VSCode (as explained in previous examples)

- for lambda

```
sam local invoke DemoMathGetSumLambda `
--template-file template-all.yaml `
-d 9999
```

- for http api

```
sam local start-api `
--template-file template-all.yaml `
--port 3000
--debug-port 9999
```

#### Delete from AWS

- use following command to delete it from AWS cloud

- if deployed using template-all.yaml

`> sam delete --stack-name demo-math-api-only`

- and similarly for other stacks based on the chosen deployment type earlier

## Demo

An example on how to send/consume SQS messages. The samples demonstrate the following:

- Send a message to SQS (add to queue)
- Consume a message from SQS (there is no push mechanism in SQS and the messages can only be polled/pulled)
- Basic message consumer without polling
- Using external lib (sqs-consumer) for continuous polling
- How to keep connection live without closing (by using AWS creds during runtime)
- Simple callback demo once a msg is received

NOTE: this uses concepts from previous examples

### Heads-up

- Env: Win 10
- Needs AWS CLI
- AWS CLI version: 2.4.9
- Node version: 14.18.1
- NPM version: 6.14.15

### Steps to deploy / test

- use following command to start callback endpoint (which receives msg after consuming from SQS)

`\sqs-samples\ext-server> node app`

- use following command to start consumer (continuous polling). You can also start `node .\app-03.js` if no callback implementation is needed.

`sqs-samples\sqs-polling-consumer> node .\app-webhook.js`

- use following command to send a message to SQS

`sqs-samples\sqs-sender> node app`

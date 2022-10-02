//keeps connection live without closing.
//must provide AWS creds


const { Consumer } = require('sqs-consumer');
const AWS = require('aws-sdk');
const https = require('https');


AWS.config.update({
  region: 'us-east-2',
  accessKeyId: '<your-aws-cli-client-id>',
  secretAccessKey: '<your-aws-cli-secret>'
});

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/<path-to-your-queue>',
  handleMessage: async (message) => {
    // do some work with `message`
    console.log(message);
  },
  sqs: new AWS.SQS({
    httpOptions: {
      agent: new https.Agent({
        keepAlive: true
      })
    }
  })
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();
//using external lib for continuous polling

const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/<path-to-your-queue>',
  handleMessage: async (message) => {
    console.log(message);
  },
  messageAttributeNames: ['All']
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();
//using external lib for continuous polling

const { Consumer } = require('sqs-consumer');
const axios = require('axios').default;

const sendPostRequest = async (newMsg) => {
  try {
    const resp = await axios.post('http://localhost:9090/hook', newMsg);
    console.log(resp.data);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/<path-to-your-queue>',
  handleMessage: async (message) => {
    console.log(message);
    sendPostRequest(message);
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


///////////////

//using external lib for continuous polling







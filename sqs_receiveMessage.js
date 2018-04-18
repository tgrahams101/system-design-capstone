const AWS = require('aws-sdk');
const keys = require('./config.js');

const inboxUrl = 'https://sqs.us-west-2.amazonaws.com/503244390256/test-inbox';
const outboxUrl = 'https://sqs.us-west-2.amazonaws.com/503244390256/test-outbox';

AWS.config.update({accessKeyId: keys.accessKeyId ,
  secretAccessKey: keys.secretAccessKey,
  region: 'us-west-2'});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const params = {
  AttributeNames: [
    'SentTimestamp'
  ],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: [
    'All'
  ],
  QueueUrl: inboxUrl,
  VisibilityTimeout: 0,
  WaitTimeSeconds: 0
};

for (var i = 0; i < 20; i++)  {

  sqs.receiveMessage(params, (err, data) => {
    if (err) {
    } else if (data.Messages) {
      const deleteParams = {
        QueueUrl: inboxUrl,
        ReceiptHandle: data.Messages[0].ReceiptHandle
      };
      sqs.deleteMessage(deleteParams, (err, data) => {
        if (err) {
        } else {
        }
      });
    }
  });
}

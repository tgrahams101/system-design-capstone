const AWS = require('aws-sdk');
const keys = require('./config.js');

const inboxUrl = 'https://sqs.us-west-2.amazonaws.com/503244390256/test-inbox';
const outboxUrl = 'https://sqs.us-west-2.amazonaws.com/503244390256/test-outbox';

AWS.config.update({accessKeyId: keys.accessKeyId ,
  secretAccessKey: keys.secretAccessKey,
  region: 'us-west-2'})

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const spinUpOneMessage = () => {

  const params = {
    DelaySeconds: 10,
    MessageAttributes: {
      'Title': {
        DataType: 'String',
        StringValue: 'The Whistler'
      },
      'RandomNumber': {
        DataType: 'Number',
        StringValue: (Math.floor(Math.random() * 10000)).toString()
      }
    },
    MessageBody: 'Information about current NY Times fiction bestseller for week of 12/11/2016.',
    QueueUrl: inboxUrl
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('SENT DATA OBJECT', data);
      console.log('Success', data.MessageId);
    }
  });
}

var i = 0;
while (i < 200) {
  spinUpOneMessage();
  i++
}


//
// const params = {
//   DelaySeconds: 10,
//   MessageAttributes: {
//     'Title': {
//       DataType: 'String',
//       StringValue: 'The Whistler'
//     },
//     'Author': {
//       DataType: 'String',
//       StringValue: 'John Grisham'
//     },
//     'WeeksOn': {
//       DataType: 'Number',
//       StringValue: '6'
//     }
//   },
//   MessageBody: 'Information about current NY Times fiction bestseller for week of 12/11/2016.',
//   QueueUrl: inboxUrl
// };
//
// sqs.sendMessage(params, (err, data) => {
//   if (err) {
//     console.log('Error', err);
//   } else {
//     console.log('SENT DATA OBJECT', data);
//     console.log('Success', data.MessageId);
//   }
// });
//

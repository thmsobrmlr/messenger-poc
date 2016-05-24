import request from 'request';

function sendMessage(pageAccessToken, recipientId, data) {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: pageAccessToken },
    method: 'POST',
    json: {
      recipient: { id: recipientId },
      message: data,
    },
  }, (error, response) => {
    if (error) {
      console.log('Error sending messages: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

function sendStructuredMessage(pageAccessToken, recipientId, template) {
  const messageData = {
    attachment: {
      type: 'template',
      payload: template,
    },
  };

  sendMessage(pageAccessToken, recipientId, messageData);
}

export function sendTextMessage(pageAccessToken, recipientId, text) {
  const messageData = {
    text,
  };

  sendMessage(pageAccessToken, recipientId, messageData);
}

export function sendImage(pageAccessToken, recipientId, imageUrl) {
  const messageData = {
    attachment: {
      type: 'image',
      payload: {
        url: imageUrl,
      },
    },
  };

  sendMessage(pageAccessToken, recipientId, messageData);
}

export function sendGenericTemplate(pageAccessToken, recipientId) {
  const elem1 = {
    title: 'Title 1',
    subtitle: 'My subtitle',
  };

  const template = {
    template_type: 'generic',
    elements: [
      elem1,
    ],
  };

  sendStructuredMessage(pageAccessToken, recipientId, template);
}

export function sendReceiptTemplate(pageAccessToken, recipientId) {
  const template = {
    template_type: 'receipt',
    recipient_name: 'Max Müller',
    order_number: '129512581',
    currency: 'INR',
    payment_method: 'COD',
    elements: [{
      title: 'T-Shirt',
      price: 700,
    }],
    summary: {
      total_cost: 700,
    },
  };


  sendStructuredMessage(pageAccessToken, recipientId, template);
}

export default {
  sendTextMessage,
  sendImage,
  sendGenericTemplate,
  sendReceiptTemplate,
};

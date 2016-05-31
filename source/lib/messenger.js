import request from 'request-promise';

function FacebookApiException(message) {
  this.message = message;
  this.name = 'FacebookException';
}

function sendMessage(pageAccessToken, recipientId, data) {
  const payload = {
    recipient: { id: recipientId },
    message: data,
  };

  const options = {
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: pageAccessToken },
    method: 'POST',
    body: payload,
    json: true,
  };

  return request(options)
    .then((body) => {
      if (body.error) {
        throw new FacebookApiException(body.error.error_data);
      }

      payload.message.mid = body.message_id;

      return payload;
    });
}

function sendStructuredMessage(pageAccessToken, recipientId, template) {
  const messageData = {
    attachment: {
      type: 'template',
      payload: template,
    },
  };

  return sendMessage(pageAccessToken, recipientId, messageData);
}

export function sendTextMessage(pageAccessToken, recipientId, text) {
  const messageData = {
    text,
  };

  return sendMessage(pageAccessToken, recipientId, messageData);
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

  return sendMessage(pageAccessToken, recipientId, messageData);
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

  return sendStructuredMessage(pageAccessToken, recipientId, template);
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

  return sendStructuredMessage(pageAccessToken, recipientId, template);
}

export default {
  sendTextMessage,
  sendImage,
  sendGenericTemplate,
  sendReceiptTemplate,
};

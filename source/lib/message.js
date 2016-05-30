function transformMessage(event) {
  const transformedMessage = {
    key: event.message.mid,
  };

  if (event.sender) {
    transformedMessage.direction = 'incoming';
  } else {
    transformedMessage.direction = 'outgoing';
  }

  if (event.message.text) {
    transformedMessage.type = 'text';
    transformedMessage.text = event.message.text;
  } else {
    transformedMessage.type = event.message.attachment.type;
    transformedMessage.attachment = event.message.attachment;
  }

  return transformedMessage;
}

export default transformMessage;

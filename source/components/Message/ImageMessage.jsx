// TODO: Props validation
import React from 'react';

const ImageMessage = (props) =>
  <img src={props.attachment.payload.url} role="presentation" />;

export default ImageMessage;

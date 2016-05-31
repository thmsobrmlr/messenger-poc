import React, { PropTypes } from 'react';

import TextMessage from './TextMessage';
import ImageMessage from './ImageMessage';
import TemplateMessage from './TemplateMessage';

const Message = (props) => {
  let elem;

  if (props.type === 'text') {
    return <TextMessage {...props} />;
  } else if (props.type === 'image') {
    return <ImageMessage {...props} />;
  } else if (props.type === 'template') {
    return <TemplateMessage {...props} />;
  }

  return elem;
};

Message.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Message;

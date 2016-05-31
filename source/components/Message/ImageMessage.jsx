import React, { PropTypes } from 'react';

import styles from './index.css';

const ImageMessage = (props) => {
  const directionClass = props.direction === 'incoming' ? styles.incoming : styles.outgoing;
  const className = `${styles.image} ${directionClass}`;

  return <img className={className} src={props.attachment.payload.url} role="presentation" />;
};

ImageMessage.propTypes = {
  direction: PropTypes.string.isRequired,
  attachment: PropTypes.shape({
    payload: {
      url: PropTypes.string.isRequired,
    },
  }),
};

export default ImageMessage;

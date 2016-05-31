import React, { PropTypes } from 'react';

import styles from './index.css';

const TextMessage = (props) => {
  const directionClass = props.direction === 'incoming' ? styles.incoming : styles.outgoing;
  const className = `${styles.message} ${directionClass}`;

  return <div className={className}>{props.text}</div>;
};

TextMessage.propTypes = {
  direction: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default TextMessage;

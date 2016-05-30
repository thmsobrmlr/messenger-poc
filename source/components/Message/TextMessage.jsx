// TODO: Add prop validation
import React from 'react';

import styles from './index.css';

const TextMessage = (props) => {
  const directionClass = props.direction === 'incoming' ? styles.incoming : styles.outgoing;
  const className = `${styles.message} ${directionClass}`;

  return <div className={className}>{props.text}</div>;
};

export default TextMessage;

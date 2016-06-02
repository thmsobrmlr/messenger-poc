import React from 'react';

import { Link, IndexLink } from 'react-router';

const Header = () =>
  <ul>
    <li><IndexLink to="/" activeStyle={{ color: 'red' }}>Home</IndexLink></li>
    <li><Link to="/about" activeStyle={{ color: 'red' }}>About</Link></li>
    <li><Link to="/messages" activeStyle={{ color: 'red' }}>Messages</Link></li>
  </ul>;

export default Header;

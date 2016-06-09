import React, { PropTypes } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

const AppLayout = (props) =>
  <div>
    <Header />
    {props.children}
    <Footer />
  </div>;

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppLayout;

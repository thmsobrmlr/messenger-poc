import React from 'react';

const LoginPage = () =>
  <div>
    <h1>Login</h1>
    <form>
      <input name="email" type="text" placeholder="Email Address" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <span>or</span>
    <a href="">Login with Facebook</a>
  </div>;

export default LoginPage;

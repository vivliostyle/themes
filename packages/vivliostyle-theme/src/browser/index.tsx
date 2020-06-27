import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const args = window.location.hash
  ? Object.fromEntries(
      window.location.hash
        .slice(1)
        .split('&')
        .map((l: string) => l.split('=')),
    )
  : {};
console.log(args);

ReactDOM.render(
  <App source={args.uri} style={args.style} />,
  document.querySelector('#app'),
);

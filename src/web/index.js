import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// import walkMD from './walkmd';
// AppContainer is a necessary wrapper component for HMR

import App from './App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);


// Hot Module Replacement API
if (module.hot) {
  console.log('module.hot:', module.hot)
  module.hot.accept('./App', () => {
    render(App)
  });
}
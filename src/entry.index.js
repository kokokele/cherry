import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App  from '../theme';

import DB from '../theme/tmp/__md__.json';



// class App extends React.Component {

//   render() {
//       return <div> {1}</div>;
//   }
// }

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component db={DB}/>
    </AppContainer>,
    document.getElementById('root')
  );
}

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('../theme', () => {
    render(App)
  });
}
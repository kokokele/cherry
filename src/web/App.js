import React from 'react';
import styles from './App.css';
// import 'antd/dist/antd.css';
import RM from 'react-dom';

import Render from './render';
// import {Comp, md, id} from './test.md';
// const mid = './test.md';
// const MD = require(mid + '');
// const MD2 = require(p.substr());
// const MD2 = require('../md')


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  handleClicked(page) {
    this.refs.render.setPage(page);
  }

  render() {
    return (
       <div className={styles.app}>
         <Render ref='render'/>
         <button onClick={this.handleClicked.bind(this, 'A')}>测试A</button>
          <button onClick={this.handleClicked.bind(this, 'B')}>测试B</button>

       </div>
    )
  }
}

export default App;
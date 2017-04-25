import React from 'react';
import styles from './App.css';
// import 'antd/dist/antd.css';
import {Button, DatePicker } from 'antd';
import RM from 'react-dom';

import {Comp, md, id} from './test.md';

import JSON from './__md__.json';

const path = require('path');


const mid = './test.md';

const MD = require(mid + '');



// const MD2 = require(p.substr());
const MD2 = require('../md')


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('comp:', JSON);
    RM.render(<MD.Comp />, document.getElementById(id));
  }

  render() {
    return (
       <div className={styles.app}>
         <div
              dangerouslySetInnerHTML={{ __html: decodeURIComponent(MD2[0].md) }}
            />
       
        <div
              dangerouslySetInnerHTML={{ __html: decodeURIComponent(MD.md) }}
            />
       </div>
    )
  }
}

export default App;
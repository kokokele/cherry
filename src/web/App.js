import React from 'react';
import styles from './App.css';
// import 'antd/dist/antd.css';
import {Button, DatePicker } from 'antd';
import RM from 'react-dom';

import {Comp, md, id} from './test.md';

const MD = require('./test.md');


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('comp:', MD);
    RM.render(<MD.Comp />, document.getElementById(id));
  }

  render() {
    return (
       <div className={styles.app}>
        <div
              dangerouslySetInnerHTML={{ __html: decodeURIComponent(md) }}
            />
       </div>
    )
  }
}

export default App;
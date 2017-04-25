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
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Sider } = Layout;


import HeaderView from './header';
import SiderView from './sider';
import ContentView from './content';

import DB from '../tmp/__md__.json';


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
      <Layout>
        <HeaderView />
        <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <SiderView db={DB}/>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
                <ContentView />
              </Breadcrumb>
             </Layout>
        </Layout>

      </Layout>
    )
  }
}

export default App;
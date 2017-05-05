import React from 'react';
import styles from './app.css';
import RM from 'react-dom';
import Render from './render';
import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Link,
  Redirect
} from 'react-router-dom';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Sider, Header } = Layout;

import HeaderView from './header';
import SiderView from './sider';
import ContentView from './content';
import NavContent from './navContent';

const SiderContent = (p) => {
    return (
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <SiderView db={p.db} />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
            <Route exact path="/page/:pageName" render={(props) => (
                <ContentView db={p.db} match={props.match}/>
            )}/>
          </Layout>
      </Layout>
    )
}

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const config = require(this.props.db.root + '/cherry.config');
    console.log('============');
    // console.log(config);
  }

  render() {
    const {db} = this.props;
    return (
      <HashRouter>
        <Layout>
          <Header>
            <HeaderView db={db}/>
          </Header>

          <Redirect from='/' to='/page'/>
          <Route path="/page" render={(props) => (
            <SiderContent db={db} />
          )}/>

          <Route path="/nav/:key" render={(props) => (
            <NavContent db={db} {...props}/>
          )}/>
        </Layout>
      </HashRouter>
    )
  }
}

export default Index;

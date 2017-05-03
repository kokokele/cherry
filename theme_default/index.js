import React from 'react';
import styles from './app.css';
import RM from 'react-dom';
import Render from './render';
import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Link
} from 'react-router-dom';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Sider } = Layout;

import HeaderView from './header';
import SiderView from './sider';
import ContentView from './content';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    // const config = require(this.props.db.root + '/cherry.config');

    console.log('============');
    // console.log(config);
  }

  handleClicked(page) {
    this.refs.render.setPage(page);
  }

  render() {
    const {db} =  this.props;
    return (
      <HashRouter>
        <Layout>
          <HeaderView />
          <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <SiderView db={db} />
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                   <Route exact path="/page/:pageName" render={(props) => (
                      <ContentView db={db} match={props.match}/>
                  )}/>
              </Layout>
          </Layout>
        </Layout>
      </HashRouter>
    )
  }
}

export default Index;
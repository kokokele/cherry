import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';

const { Header} = Layout;

import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Redirect,
  Link
} from 'react-router-dom';


export default class HeaderView extends React.Component {


    render() {
        const {db} = this.props;
        const nav = db.nav;

        const menuItems = nav.map((item, i) => {
            if (item.http) {
               return <Menu.Item key={i}><a href={item.http} target='__blank'>{item.label}</a></Menu.Item>
            } else {
                return <Menu.Item key={i}> <Link to={"/nav/" + item.label}>{item.label}</Link></Menu.Item>
            }
        });

        return (
            <div>
                <Row>
                    <Col span={4}>
                        <div  ><Link to="/page"><span style={{color:"#CCC"}}>{db.config.title}</span></Link></div>
                    </Col>
                    <Col span={20}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            {menuItems}
                        </Menu>
                    </Col>
                </Row>
              
                
            </div>
        )
    }
}
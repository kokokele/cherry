import React from 'react';
import { Layout, Menu } from 'antd';

const { Header} = Layout;


export default class HeaderView extends React.Component {
    render() {
        return (
            <Header className="header">
            <div className="logo" style={{width:"220px"}}>
            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1">NRC</Menu.Item>
                
            </Menu>
            </Header>
        )
    }
}
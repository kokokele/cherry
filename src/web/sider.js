import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

import PubSub from 'pubsub-js';


export default class SiderView extends React.Component {

    constructor(props) {
        super(props);
    }


    $renderItem(db) {
        let res = [];
        for(var k in db) {
            const list = db[k];
            const items = list.map((item, i) => {
                return <Menu.Item key={item.page}>{item.page}</Menu.Item>
            });
            res.push((
                <SubMenu key={k} title={k}>
                    {items}
                </SubMenu>
            ))
        }
        return res;
    }

    handleMenuClick({item, key, keyPath}) {
        console.log(item, key);

        PubSub.publish('SET_PAGE', key);

    } 

    render() {

        const menuItems = this.$renderItem(this.props.db);
        

        return (
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['0']}
                    defaultOpenKeys={['Comp']}
                    style={{ height: '100%' }}
                    onClick={this.handleMenuClick.bind(this)}
                >
                    {menuItems}

                
                </Menu>
        )
    }
}
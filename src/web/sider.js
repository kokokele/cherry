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

        const{md, config} = db;

        const res = [];

        const category = config.category.slice();
        
        category.forEach((cg, i) => {
            const list = md[cg];
            const items = list.map((item, i) => {
                return <Menu.Item key={item.page}>{item.page}</Menu.Item>
            });

            res.push((
                    <SubMenu key={cg + '-key'} title={cg}>
                        {items}
                    </SubMenu>
                ));
        });
        return res;
    }

    componentDidMount() {

        const{md, config} =this.props.db;
        const cg = config.category[0];

            console.log(config);



            if(cg) PubSub.publish('SET_PAGE', md[cg][0].page);
    }

    handleMenuClick({item, key, keyPath}) {
        console.log(item, key);

        PubSub.publish('SET_PAGE', key);

    } 

    render() {

        const menuItems = this.$renderItem(this.props.db);
        const{md, config} =this.props.db;

        const defaultKeys = config.category.map(item => {
            return item + '-key';
        })

        return (
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['0']}
                    defaultOpenKeys={defaultKeys}
                    style={{ height: '100%' }}
                    onClick={this.handleMenuClick.bind(this)}
                >
                    {menuItems}

                
                </Menu>
        )
    }
}
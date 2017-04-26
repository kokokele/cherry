import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Redirect,
  Link
} from 'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;

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
                const to = `/page/${item.page}`;
                console.log("to::::", to)
                return(
                    <Menu.Item key={item.page}>
                        <Link to={to}>
                            {item.page}
                        </Link>
                    </Menu.Item>
                )
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
        // const{md, config} =this.props.db;
        // const cg = config.category[0];
        // if(cg) PubSub.publish('SET_PAGE', md[cg][0].page);
    }

    render() {
        const menuItems = this.$renderItem(this.props.db);
        const{md, config} =this.props.db;
        const cg = config.category[0];

        const defaultKeys = config.category.map(item => {
            return item + '-key';
        })

        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['0']}
                defaultOpenKeys={defaultKeys}
                style={{ height: '100%' }}
            >
                {menuItems}

                <Redirect to={`/page/${md[cg][0].page}`}/>
            
            </Menu>
        )
    }
}
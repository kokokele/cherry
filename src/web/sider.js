import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Redirect,
  Link
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'


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

        
        const renderMenuItem = (list, cg) => {
            const items = list.map((item, i) => {
                const to = `/page/${item.page}`;
                return(
                    <Menu.Item key={item.page}>
                        <Link to={to}>
                            {item.page}
                        </Link>
                    </Menu.Item>
                )
            });

            return items;
        };

        // 如果md 文件没有设置 category 直接渲染 menuItem；
        if (md.default && md.default.length) {
            res.push(renderMenuItem(md.default));
        }

        category.forEach((cg, i) => {
            const list = md[cg];
            const items = renderMenuItem(list, cg);

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

        const history = createHistory()
        const location = history.location;
              
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['0']}
                defaultOpenKeys={defaultKeys}
                style={{ height: '100%' }}
            >
                {menuItems}
                {(location.pathname === '/' && location.hash === '#/' ) && (<Redirect to={`/page/${md[cg][0].page}`}/>)}
            </Menu>
        )
    }
}
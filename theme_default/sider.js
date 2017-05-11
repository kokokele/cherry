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

            if (!list || !list.length) return null;
            const items = list.map((item, i) => {
                const to = `/page/${item.key}`;
                return(
                    <Menu.Item key={item.key}>
                        <Link to={to}>
                            {item.page}
                        </Link>
                    </Menu.Item>
                )
            });

            return items;
        };

        // 如果md 文件没有设置 category 直接渲染 menuItem；
        if (md.__default__ && md.__default__.length) {
            res.push(renderMenuItem(md.__default__));
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
    }

    render() {
        const menuItems = this.$renderItem(this.props.db);
        const{md, config} =this.props.db;

        // 获取默认首页-然后跳转
        let indexPage;
        const history = createHistory()
        const location = history.location;
        if ( location.hash === '#/' || location.hash === '#/page' || location.hash === '#/page/') {
            if (md.__default__ && md.__default__.length) {
            indexPage = md.__default__[0].key;
            } else  {
                if (config.category && config.category.length) {
                    const cg = config.category[0];
                   indexPage = md[cg][0].key;
                }

            }
        }
        // 默认全部展示二级菜单
        let defaultKeys = [];
        if (config.category && config.category.length) {
                defaultKeys = config.category.map(item => {
                return item + '-key';
            })
        }
        
        return (
            <Menu
                mode="inline"
                defaultSelectedKeys={['0']}
                defaultOpenKeys={defaultKeys}
                style={{ height: '100%' }}
            >
                {menuItems}
                {indexPage && (<Redirect to={`/page/${indexPage}`}/>)}
            </Menu>
        )
    }
}

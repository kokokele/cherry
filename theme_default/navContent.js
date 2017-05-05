import React from 'react';

import { Layout } from 'antd';
const {Content} = Layout;
import Render from './render';

export default class NavContent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {match, db} = this.props;

        const key = match.params.key;
        const nav = db.nav;

        let page;
        nav.every(item => {
            if(item.label === key) {
                page = item.md;
                return false;
            }
            return true;
        })

        if(!page) return <div>找不到页面。</div>;

        return (
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                <Render page={page}/>
            </Content>
        )
    }
}

import React from 'react';

import { Layout } from 'antd';
const {Content} = Layout;
import Render from './render';

export default class ContentView extends React.Component {

    token;

    constructor(props) {
        super(props);
    }

    render() {
        // console.log('================')
        // console.log(this.props);
        const {match, db} = this.props;
        return (
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                <Render ref='render' pageName={match.params.pageName} db={db}/>
            </Content>
        )
    }
}
import React from 'react';
import PubSub from 'pubsub-js';

import { Layout } from 'antd';

const {Content} = Layout;

import Render from './render';


export default class ContentView extends React.Component {
    constructor(props) {
        super(props);

        var mySubscriber = ( msg, data ) => {
            this.refs.render.setPage(data);
        };

        var token = PubSub.subscribe('SET_PAGE', mySubscriber );
    }

    render() {
        return (
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                <Render ref='render'/>
            </Content>
        )
    }
}
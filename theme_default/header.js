import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';

const { Header} = Layout;


export default class HeaderView extends React.Component {


    render() {
        const {db} = this.props;

        return (
            <div>
                <Row>
                    <Col span={6}>
                        <div  style={{color:"#fff"}}>{db.config.title}</div>
                    </Col>
                    <Col span={18}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Col>
                </Row>
              
                
            </div>
        )
    }
}
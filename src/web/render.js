import React from 'react';
import RM from 'react-dom';

import mdJson from '../tmp/__md__.json';


export default class Render extends React.Component {

    page;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.$renderComp();
    }

    componentDidUpdate() {
        this.$renderComp();
    }

    $renderComp() {
        this.page.forEach(p => {
            const Comp = p.default;
            if (Comp) {
                RM.render(<Comp />, document.getElementById(p.id));
            }
        });
    }

    $parseMD(page) {
        const res = page.map(item => {
            return <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(item.md)}} />
        });

        return res;
    }

    render() {
        const {pageName} = this.props;

        this.page = require(`../tmp/__${pageName}`);

        if (!this.page) return <div />;

        return (
            <div>
                {this.$parseMD(this.page)}
            </div>
        )
    }
}
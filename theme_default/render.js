import React from 'react';
import RM from 'react-dom';

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
        if (!this.page) return;
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
        const {pageName, db} = this.props;
        const root  = '/Users/zhangpeng53/Documents/my/markdoc/theme/tmp';
        this.page = require(`${db.source[pageName]}`);
        // const req = require.context(root, false, /^\.\/.*\.js$/)
        // this.page = req('./__A.js');

        if (!this.page) return <div />;

        return (
            <div>
                {this.$parseMD(this.page)}
            </div>
        )
    }
}
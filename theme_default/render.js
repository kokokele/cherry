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
        const {page} = this.props;

        if (!page) return;
        page.forEach(p => {
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
        const {page} = this.props;

        console.log('page:', page)

        if (!page) return <div />;

        return (
            <div>
                {this.$parseMD(page)}
            </div>
        )
    }
}
import React from 'react';
import RM from 'react-dom';

import mdJson from '../tmp/__md__.json';


export default class Render extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page : ''
        }
    
    }
    setPage(pageName) {
        this.setState({
            page: require(`../tmp/__${pageName}`)
        })
    }

    componentDidMount() {
        // RM.render(<MD.Comp />, document.getElementById(id));
    }

    componentDidUpdate() {

        const {page} = this.state;
        const Comp = page[0].default;

        page.forEach(p => {
            const Comp = p.default;
            if (Comp) {
                console.log(p.id)
                RM.render(<Comp />, document.getElementById(p.id));
            }
        })

        

        

    }

    $parseMD(page) {
        const res = page.map(item => {
            return <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(item.md)}} />
        });

        return res;
    }


    render() {
        const {page} = this.state;
        if (!page) return <div />;

        return (
            <div>
                {this.$parseMD(page)}
            </div>
        )

    }
}
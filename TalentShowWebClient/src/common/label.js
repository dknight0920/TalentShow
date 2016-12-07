import React from 'react';

class Label extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<label className="control-label">{this.props.children}</label>);
    }
}

export default Label;
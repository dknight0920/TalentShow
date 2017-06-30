import React from 'react';
import ReactSelect from 'react-select';
import FormGroup from './formGroup';
import Label from './label';

class Select extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormGroup>
                <Label>{this.props.label}</Label>
                <ReactSelect
                    name={this.props.name}
                    value={this.props.value}
                    options={this.props.options}
                    onChange={this.props.onChange} />
            </FormGroup>
        );
    }
}

export default Select;
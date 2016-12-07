import React from 'react';
import FormGroup from './formGroup'
import Label from './label'

class Input extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormGroup>
                <Label>{this.props.label}</Label>
                <input 
                    className="form-control" 
                    name={this.props.name} 
                    type={this.props.type} 
                    placeholder={this.props.label}
                    value={this.props.value} 
                    onChange={this.props.onChange} />
            </FormGroup>
        );
    }
}

export default Input;
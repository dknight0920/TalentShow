import React from 'react';
import FormGroup from './formGroup'
import RoleAwareComponent from './roleAwareComponent';

class Button extends RoleAwareComponent {

    constructor(props) {
        super(props);
        this.authorizedRoles = [];
    }

    componentWillMount(){
        if(this.props.authorizedRoles && this.props.authorizedRoles.length){
            this.authorizedRoles = this.props.authorizedRoles;
        }
    }

    render() {
        if(!this.shouldBeVisible()){
            return null;
        }

        return (
            <FormGroup>
                <input 
                    className={"btn btn-sm btn-" + (this.props.type || "default")}
                    name={this.props.name} 
                    type="button" 
                    value={this.props.value} 
                    onClick={this.props.onClick} />
            </FormGroup>
        );
    }
}

export default Button;
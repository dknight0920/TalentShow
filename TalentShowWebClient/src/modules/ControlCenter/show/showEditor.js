import React from 'react';
import { hashHistory } from 'react-router';
import * as ShowActions from '../../../data/actions/showActions';
import PageContent from '../../../common/pageContent';
import FormGroup from '../../../common/formGroup'
import Input from '../../../common/input';
import Button from '../../../common/button';

class ShowEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleClickSave = this.handleClickSave.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.getState = this.getState.bind(this);
        this.state =  this.getState();
    }

    handleNameChange(e) {
        var show = this.state.show;
        show.name = e.target.value;
        this.setState(show);
    }

    handleDescriptionChange(e) {
        var show = this.state.show;
        show.description = e.target.value;
        this.setState(show);
    }

    handleClickSave(e) {
        e.preventDefault();
        this.props.OnClickSave(this.state.show);
    }

    handleClickCancel(e) {
        e.preventDefault();
        this.props.OnClickCancel();
    }

    getState() {
        if(this.props.show){
            return { show: show };
        } else {
            return { show: {
                id: 0,
                name: "",
                description: ""
            } };
        }
    }

    render() {
        return (
            <div>
                    <Input 
                        name="name" 
                        type="text"
                        label="Show Name"
                        value={this.state.show.name}
                        onChange={this.handleNameChange} />

                    <Input 
                        name="description" 
                        type="text"
                        label="Description"
                        value={this.state.show.description}
                        onChange={this.handleDescriptionChange} />

                    <FormGroup>
                        <Button type="default" authorizedRoles={["admin"]} name="cancel" value="Cancel" onClick={this.handleClickCancel} />
                        <Button type="primary" authorizedRoles={["admin"]} name="save" value="Save" onClick={this.handleClickSave} />
                    </FormGroup>
            </div>
        );
    }
}

export default ShowEditor;
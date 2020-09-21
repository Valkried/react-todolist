import React, { Component } from 'react';
import M from "materialize-css";

class Form extends Component {
    state = {
        inputTaskValue: ''
    }

    componentDidMount() {
        M.AutoInit();
    }

    handleChange = (event) => {
        this.setState({ inputTaskValue: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.addTask(this.state.inputTaskValue);
        this.setState({inputTaskValue: ''});
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} className="row">
                <div className="input-field col s12 l8">
                    <input
                        type="text"
                        id="todo"
                        name="todo"
                        value={this.state.inputTaskValue}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="todo">Nouvelle to do</label>
                </div>

                <div className="input-field col s12 l4">
                    <button type="submit" className="btn waves-effect waves-light">Ajouter</button>
                </div>
            </form>
        );
    }
}

export default Form;

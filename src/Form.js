import React, { Component } from 'react';
import M from "materialize-css";
import Todo from "./Todo";

export default class Form extends Component {
    componentDidMount() {
        M.AutoInit();
    }

    submitForm = (event) => {
        event.preventDefault();
        const todo = new Todo(this.props);
        todo.setContent(event.target.todo.value);
        this.props.handleSubmit(todo);
    }

    render() {
        return (
            <form onSubmit={this.submitForm} className="row">
                <div className="input-field col s12 l8">
                    <input type="text" id="todo" />
                    <label htmlFor="todo">Nouvelle to do</label>
                </div>
                <div className="input-field col s12 l4">
                    <button type="submit" className="btn waves-effect waves-light">Ajouter</button>
                </div>
            </form>
        );
    }
}
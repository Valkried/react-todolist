import React, { Component } from 'react';
import Form from './Form';
import List from './List';
import Empty from './Empty';

export default class App extends Component {
    state = {
        todos: []
    }

    handleSubmit = (todo) => {
        this.setState({todos: [...this.state.todos, todo]});
    }

    deleteAllCheckedTodos = () => {
        this.setState(
            {todos: this.state.todos.filter(todo => todo.checked === false)},
            () => {
                document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                    checkbox.nextSibling.style.textDecoration = 'none';
                    checkbox.checked = false;
                });
            }
        );
    }

    render() {
        const {todos} = this.state;

        return (
            <div>
                <header>
                    <h1>To do list</h1>
                </header>

                <main className="container">
                    <Form handleSubmit={this.handleSubmit} />
                    <List todosData={todos} />
                </main>

                {
                    todos.length > 0 &&
                    <footer>
                        <Empty deleteAllCheckedTodos={this.deleteAllCheckedTodos} />
                    </footer>
                }
            </div>
        );
    }
}
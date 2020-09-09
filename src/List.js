import React, { Component } from 'react';
import Todo from "./Todo";

export default class List extends Component {
    render() {
        const todos = this.props.todosData.map((todo, index) => {
            return (
                <Todo key={index} todoData={todo} switchChecked={this.props.switchChecked} />
            );
        });

        return (
            <div className="row">
                <div className="col s12">
                    {
                        todos.length > 0 &&
                        <ul className="collection">
                            {todos}
                        </ul>
                    }
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';

export default class Todo extends Component {
    content = '';
    checked = false;

    setContent = (content) => {
        this.content = content;
    }

    switchChecked = (event) => {
        const {todoData} = this.props;

        if (todoData.checked) {
            todoData.checked = false;
            event.target.nextSibling.style.textDecoration = 'none';
        } else {
            todoData.checked = true;
            event.target.nextSibling.style.textDecoration = 'line-through';
        }
    }

    render() {
        const {todoData} = this.props;

        return (
            <li className="collection-item">
                <label>
                    <input onChange={this.switchChecked} type="checkbox" />
                    <span>{todoData.content}</span>
                </label>
            </li>
        );
    }
}
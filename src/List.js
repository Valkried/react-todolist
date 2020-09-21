import React, { Component } from 'react';

class List extends Component {
    handleCheck = (event) => {
        this.props.checkTask(parseInt(event.target.getAttribute("data-index")));
    };

    render() {
        const tasksLi = this.props.tasks.map((task, index) => {
            const liClass = task.checked ? "checkedLi" : "";
            return (
                <li className="collection-item" key={index}>
                    <label>
                        <input
                            type="checkbox"
                            data-index={index}
                            onChange={this.handleCheck}
                            checked={task.checked}
                        />
                        <span className={liClass}>{task.name}</span>
                    </label>
                </li>
            );
        });

        return(
            <div className="row">
                <div className="col s12">
                    {
                        tasksLi.length > 0 &&
                        <ul className="collection">
                            {tasksLi}
                        </ul>
                    }
                </div>
            </div>
        );
    }
}

export default List;

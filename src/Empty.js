import React, { Component } from 'react';

export default class Empty extends Component {
    render() {
        return (
            <button onClick={this.props.deleteAllCheckedTodos} className="btn-flat waves-effect">Supprimer les "to do" validées</button>
        );
    }
}
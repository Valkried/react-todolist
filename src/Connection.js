import React, { Component } from 'react';

class Connection extends Component {
    initialState = {
        username: '',
        password: ''
    };

    state = this.initialState;

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const {username, password} = this.state;

        this.props.verifyLogin(username, password);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="row">
                <div className="input-field col s12 m6 l4">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                        minLength="6"
                    />
                    <label htmlFor="username">Nom d'utilisateur</label>
                </div>

                <div className="input-field col s12 m6 l4">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                        minLength="6"
                    />
                    <label htmlFor="password">Mot de passe</label>
                </div>

                <div className="input-field col s12 l4">
                    <button type="submit" className="btn waves-effect waves-light">Connexion</button>
                </div>
            </form>
        );
    }
}

export default Connection;

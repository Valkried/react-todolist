import React from 'react';

class SignUpForm extends React.Component {
    state = {
        signUpUsername: '',
        signUpPassword: '',
        signUpPasswordRepeat: ''
    }

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { signUpUsername, signUpPassword, signUpPasswordRepeat } = this.state;

        if (signUpPassword === signUpPasswordRepeat) {
            this.props.handleSignUp(signUpUsername, signUpPassword);
        } else {
            alert('Les deux mots de passe doivent être similaires');
        }
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} className="row">
                <div className="input-field col s12 m6 l4">
                    <input
                        type="text"
                        id="signUpUsername"
                        name="signUpUsername"
                        value={this.state.signUpUsername}
                        onChange={this.handleChange}
                        required
                        minLength="6"
                    />
                    <label htmlFor="signUpUsername">Nom d'utilisateur</label>
                </div>

                <div className="input-field col s12 m6 l4">
                    <input
                        type="password"
                        id="signUpPassword"
                        name="signUpPassword"
                        value={this.state.signUpPassword}
                        onChange={this.handleChange}
                        required
                        minLength="6"
                    />
                    <label htmlFor="signUpPassword">Mot de passe</label>
                </div>

                <div className="input-field col s12 m6 l4">
                    <input
                        type="password"
                        id="signUpPasswordRepeat"
                        name="signUpPasswordRepeat"
                        value={this.state.signUpPasswordRepeat}
                        onChange={this.handleChange}
                        required
                        minLength="6"
                    />
                    <label htmlFor="signUpPasswordRepeat">Répéter le mot de passe</label>
                </div>

                <div className="input-field col s12">
                    <button type="submit" className="btn waves-effect waves-light">S'inscrire</button>
                </div>
            </form>
        );
    }
}

export default SignUpForm;
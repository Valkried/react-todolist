import React, { Component } from 'react';
import Connection from './Connection';
import TaskForm from './TaskForm';
import List from './List';
import SignUpForm from './SignUpForm';

class App extends Component {
    state = {
        users: [
            {
                username: "julien",
                password: "azerty",
                tasks: [
                    { name: "Faire le café", checked: false },
                    { name: "Dire bonjour au voisin", checked: true }
                ]
            }
        ],
        connectedUser: {},
        displayLogin: true,
        btnToggleLoginSignUpContent: 'Je souhaite m\'inscrire',
        displayEditUserForm: false
    };

    checkLogin = (username, password) => {
        const user = this.state.users.find(user => username === user.username && password === user.password);

        if (user) {
            this.setState({ connectedUser: user });
        } else {
            alert("Ce couple identifiant / mot de passe n'existe pas !");
        }
    }

    updateUserTasks = () => {
        this.setState({
            users: this.state.users.map(
                user => {
                    if (user.username === this.state.connectedUser.username) {
                        user.tasks = [...this.state.connectedUser.tasks];
                    }
                    return user;
                }
            )
        });
    }

    addTask = (task) => {
        const connectedUser = { ...this.state.connectedUser };
        connectedUser.tasks.push({ name: task, checked: false });
        this.setState({ connectedUser: connectedUser }, this.updateUserTasks);
    }

    checkTask = (index) => {
        const connectedUser = { ...this.state.connectedUser };
        connectedUser.tasks = connectedUser.tasks.map((task, i) => {
            if (index === i) {
                task.checked = !task.checked;
            }
            return task;
        });

        this.setState({ connectedUser: connectedUser }, this.updateUserTasks);
    }

    removeChecked = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer vos todos accomplies ?")) {
            const connectedUser = { ...this.state.connectedUser };
            connectedUser.tasks = this.state.connectedUser.tasks.filter(tache => !tache.checked );

            this.setState({ connectedUser: connectedUser }, this.updateUserTasks);
        }
    }

    removeAllTasks = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer toutes vos todos ?")) {
            const connectedUser = { ...this.state.connectedUser };
            connectedUser.tasks = [];

            this.setState({ connectedUser: connectedUser }, this.updateUserTasks);
        }
    }

    handleSignUp = (username, password) => {
        if (this.state.users.find(user => user.username === username)) {
            alert('Cet utilisateur existe déjà');
        } else {
            const newUser = {
                username: username,
                password: password,
                tasks: []
            };

            this.setState({
                users: [...this.state.users, newUser],
                connectedUser: newUser
            });
        }

        this.toggleLoginSignUp();
    }

    handleLogout = () => {
        this.setState({
            connectedUser: {},
            displayEditUserForm: false
        });
    }

    removeConnectedUser = () => {
        if (window.confirm('Souhaitez-vous réellement supprimer votre compte ? Cette action est irréversible.')) {
            this.setState({ users: this.state.users.filter(user => user.username !== this.state.connectedUser.username) }, () => {
                this.setState({
                    connectedUser: {},
                    displayEditUserForm: false
                });
            });
        }
    }

    toggleDisplayEditUserForm = () => {
        this.setState({ displayEditUserForm: !this.state.displayEditUserForm });
    }

    handleEditUser = (username, password) => {
        if (this.state.users.find(user => user.username === username)) {
            alert('Cet utilisateur existe déjà');
        } else {
            this.setState({
                users: [...this.state.users].map(user => {
                    if (user.username === this.state.connectedUser.username) {
                        user.username = username;
                        user.password = password;
                    }
                    return user;
                }),
                displayEditUserForm: false
            }, () => {
                this.setState({ connectedUser: this.state.users.find(user => user.username === username) });
            });
        }
    }

    toggleLoginSignUp = () => {
        const displayLogin = !this.state.displayLogin;

        this.setState({
            displayLogin: displayLogin,
            btnToggleLoginSignUpContent: displayLogin ? 'Je souhaite m\'inscrire' : 'Je souhaite me connecter'
        });
    }

    render() {
        const { connectedUser, displayEditUserForm } = this.state;

        return(
            <div>
                <header>
                    <h1>To do list</h1>
                </header>

                <main className="container">
                    {
                        'username' in connectedUser
                            ?
                            <div>
                                <h2>Bonjour <span className="capitalize">{connectedUser.username}</span></h2>
                                {
                                    displayEditUserForm &&
                                    <SignUpForm handleEditUser={this.handleEditUser} connectedUser={this.state.connectedUser}/>
                                }
                                <TaskForm addTask={this.addTask} />
                                <List tasks={connectedUser.tasks} checkTask={this.checkTask} />
                            </div>
                            :
                            <div>
                                {
                                    this.state.displayLogin
                                        ?
                                        <Connection verifyLogin={this.checkLogin} />
                                        :
                                        <SignUpForm handleSignUp={this.handleSignUp} editMode={false} />
                                }
                                <div className="row">
                                    <div className="col s12">
                                        <button className="btn waves-effect waves-light blue" onClick={this.toggleLoginSignUp}>{this.state.btnToggleLoginSignUpContent}</button>
                                    </div>
                                </div>
                            </div>
                    }
                </main>

                {
                    'username' in connectedUser &&
                    <footer>
                        <button onClick={this.removeChecked} className="btn-flat waves-effect">Supprimer les "to do" validées</button>
                        <button onClick={this.handleLogout} className="btn waves-effect waves-light teal">Déconnexion</button>
                        <button onClick={this.toggleDisplayEditUserForm} className="btn waves-effect waves-light green darken-2">
                            { this.state.displayEditUserForm ? 'Annuler' : 'Modifier mon profil' }
                        </button>
                        <button onClick={this.removeConnectedUser} className="btn waves-effect waves-light red darken-2">Supprimer mon compte</button>
                    </footer>
                }
            </div>
        );
    }
}

export default App;

import React, { Component } from 'react';
import Connection from './Connection';
import Form from './Form';
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
        userLoginConnected: "",
        userTasksConnected : [],
        displayLogin: true,
        btnToggleLoginSignUpContent: 'Je souhaite m\'inscrire'
    };

    checkLogin = (username, password) => {
        const user = this.state.users.find(user => username === user.username && password === user.password);

        if (user) {
            this.setState({
                userLoginConnected: user.username,
                userTasksConnected: user.tasks
            });
        } else {
            alert("Ce couple identifiant / mot de passe n'existe pas !");
        }
    }

    updateUserTasks = () => {
        this.setState({
            users: this.state.users.map(
                user => {
                    if (user.username === this.state.userLoginConnected) {
                        user.tasks = this.state.userTasksConnected;
                    }
                    return user;
                }
            )
        });
    }

    addTask = (tache) => {
        this.setState({ userTasksConnected: [...this.state.userTasksConnected, { name: tache, checked: false }] }, this.updateUserTasks);
    }

    checkTask = (index) => {
        this.setState({
            userTasksConnected: this.state.userTasksConnected.map((task, i) => {
                if (index === i) {
                    task.checked = !task.checked;
                }
                return task;
            })
        }, this.updateUserTasks);
    }

    removeChecked = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer vos todos accomplies ?")) {
            this.setState({ userTasksConnected: this.state.userTasksConnected.filter(tache => !tache.checked )}, this.updateUserTasks);
        }
    }

    removeAllTasks = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer toutes vos todos ?")) {
            this.setState({ userTasksConnected: [] }, this.updateUserTasks);
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
            }

            this.setState({
                users: [...this.state.users, newUser],
                userLoginConnected: username,
                userTasksConnected: []
            });
        }

        this.toggleLoginSignUp();
    }

    handleLogout = () => {
        this.setState({
            userLoginConnected: "",
            userTasksConnected : []
        });
    }

    toggleLoginSignUp = () => {
        const displayLogin = !this.state.displayLogin;

        this.setState({
            displayLogin: displayLogin,
            btnToggleLoginSignUpContent: displayLogin ? 'Je souhaite m\'inscrire' : 'Je souhaite me connecter'
        });
    }

    render() {
        const {userLoginConnected, userTasksConnected} = this.state;

        return(
            <div>
                <header>
                    <h1>To do list</h1>
                </header>

                <main className="container">
                    {
                        userLoginConnected !== ""
                            ?
                            <div>
                                <Form addTask={this.addTask} />
                                <List tasks={userTasksConnected} checkTask={this.checkTask} />
                            </div>
                            :
                            <div>
                                {
                                    this.state.displayLogin
                                        ?
                                        <Connection verifyLogin={this.checkLogin} />
                                        :
                                        <SignUpForm handleSignUp={this.handleSignUp} />
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
                    userLoginConnected !== "" &&
                    <footer>
                        <button onClick={this.removeChecked} className="btn-flat waves-effect">Supprimer les "to do" validées</button>
                        <button onClick={this.handleLogout} className="btn waves-effect waves-light">Déconnexion</button>
                    </footer>
                }
            </div>
        );
    }
}

export default App;

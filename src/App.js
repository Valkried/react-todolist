import React, { Component } from 'react';
import Connection from './Connection';
import Form from './Form';
import List from './List';

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
        userIndexConnected: -1,
        userLoginConnected: "",
        userTasksConnected : []
    };

    checkLogin = (login, password) => {
        console.log(1);
        this.state.users.forEach((user, index) => {
            if (login === user.username && password === user.password) {
                this.setState({
                    userIndexConnected: index,
                    userLoginConnected: user.username,
                    userTasksConnected: user.tasks
                });
            } else {
                alert("Ce couple identifiant / mot de passe n'existe pas !");
            }
        });
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

    handleLogout = () => {
        this.setState({
            userIndexConnected: -1,
            userLoginConnected: "",
            userTasksConnected : []
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
                            <Connection verifyLogin={this.checkLogin} />
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

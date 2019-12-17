import React, {Component} from 'react';
import {Link, Router} from "@reach/router";
import {connect} from "react-redux";

import Books from "./Books";
import Book from "./Book";
import Login from "./Login";
import Alert from "./Alert";
import UserHeader from "./UserHeader";

import { login, logout, loadBooks, postBook, /* postAnswer, voteAnswerUp, */ hideAlert } from './actions';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertMsg: ""
        };
    }

    componentDidMount() {
        this.props.loadBooks();
    }

    resetAlert() {
        this.setState({
            alertMsg: "",
            suppressInfo: true
        })
    }


    render() {
        let notification = <></>;
        if (this.props.notifications.active) {
            const notif = this.props.notifications;
            const level = notif.level === "error" ? "is-danger" : "is-warning";

            notification = <section className={`hero ${level} is-small`}>
                <div className="hero-body">
                    <div className="container">
                        <button onClick={() => this.props.hideAlert()} className="delete is-large is-pulled-right" />
                        <h1 className="title">
                            {notif.title}
                        </h1>
                        <h2 className="subtitle">
                            {notif.text}
                        </h2>
                    </div>
                </div>
            </section>
        }

        return (
            <>
                {notification}

                <section className="hero is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <Link to="/"><h1 className="title is-2">Find Books</h1></Link>
                            <h2 className="subtitle">
                                Get help here!
                            </h2>
                        </div>
                    </div>
                </section>

                <UserHeader username={this.props.user.username} logout={_ => this.props.logout()}/>

                <section className="section">
                    <Alert msg={this.state.alertMsg}/>

                    <Router>
                        <Books path="/"
                            books={this.props.books}
                            onPostBook={(category) => this.props.postBook(category)}
                        />

                        <Book path="/book/:id"
                            getBook={(id) => this.props.books.find(e => e._id === id)}
                            /* handleVote={(id, aid) => this.props.voteAnswerUp(id, aid)}
                            onPostAnswer={(id, text) => this.props.postAnswer(id, text)} */
                        />

                        <Login path="/login"
                            login={(username, password) => this.props.login(username, password)}
                            infoMsg={this.state.infoMsg}
                        />
                    </Router>

                </section>

                <footer className="footer">
                    <div className="container">
                        <div className="content has-text-centered">
                            <p>
                                <strong>Book site</strong> 
                            </p>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
}

const mapStateToProps = state => ({
    books: state.books,
    user: state.user,
    notifications: state.notifications
});

const mapDispatchToProps = dispatch => ({
    loadBooks: _ => dispatch(loadBooks()),
    postBook: category => dispatch(postBook(category)),
    /* postAnswer: (id, text) => dispatch(postAnswer(id, text)), */
    login: (username, password) => dispatch(login(username, password)),
    logout: _ => dispatch(logout()),
   /*  voteAnswerUp: (bookId, answerId) => dispatch(voteAnswerUp(bookId, answerId)), */
    hideAlert: _ => dispatch(hideAlert())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)


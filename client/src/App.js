import React, { Component } from "react";
import { Link, Router } from "@reach/router";
import { connect } from "react-redux";

import Category from "./Category";
import BookList from "./BookList";
import Book from "./Book";
import PostBook from "./PostBook";
import Login from "./Login";
import Alert from "./Alert";
import UserHeader from "./UserHeader";
import PostCategory from "./PostCategory";

import {
  login,
  logout,
  loadBooks,
  postCategory,
  postBook,
  deleteCategory,
  hideAlert
} from "./actions";

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
    });
  }

  render() {
    let notification = <></>;
    if (this.props.notifications.active) {
      const notif = this.props.notifications;
      const level = notif.level === "error" ? "is-danger" : "is-warning";

      notification = (
        <section className={`hero ${level} is-small`}>
          <div className="hero-body">
            <div className="container">
              <button
                onClick={() => this.props.hideAlert()}
                className="delete is-large is-pulled-right"
              />
              <h1 className="title">{notif.title}</h1>
              <h2 className="subtitle">{notif.text}</h2>
            </div>
          </div>
        </section>
      );
    }

    return (
      <>
        {notification}

        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <Link to="/">
                <h1 className="title is-2">Find Books</h1>
              </Link>
              <h2 className="subtitle">Find used study books for sale</h2>
            </div>
          </div>
        </section>

        <UserHeader
          username={this.props.user.username}
          logout={_ => this.props.logout()}
        />
        <div className="container is-widescreen">
          <Link to="post-book">
            <p className="notification">Post a book for sale -></p>
          </Link>
        </div>

        <section className="section">
          <Alert msg={this.state.alertMsg} />

          <Router>
            <Category path="/" books={this.props.books} />

            <BookList
              path="/category/:id"
              getBook={id => this.props.books.find(e => e._id === id)}
            />

            <Book path="/book/:id" books={this.props.books} />

            <PostBook
              path="/post-book"
              books={this.props.books}
              onPostBook={book => this.props.postBook(book)}
            />

            <PostCategory
              path="/post-category"
              books={this.props.books}
              onPostCategory={category => this.props.postCategory(category)}
              onDeleteCategory={id => this.props.deleteCategory(id)}
            />

            <Login
              path="/login"
              login={(username, password) =>
                this.props.login(username, password)
              }
              infoMsg={this.state.infoMsg}
            />
          </Router>
        </section>
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
  postCategory: category => dispatch(postCategory(category)),
  postBook: book => dispatch(postBook(book)),
  deleteCategory: id => dispatch(deleteCategory(id)),
  login: (username, password) => dispatch(login(username, password)),
  logout: _ => dispatch(logout()),
  hideAlert: _ => dispatch(hideAlert())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

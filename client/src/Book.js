import React, { Component } from "react";

export default class Book extends Component {
  render() {
    const categories = this.props.books;
    console.log(categories);

    // Splitting every book into it's own array
    let allBooks = [];
    categories.forEach(cat => {
      allBooks.push(cat.books);
    });

    // Use spead operator to concat the booksArray with allBooks
    let booksArray = [];
    allBooks.forEach(book => {
      booksArray = [...booksArray, ...book];
    });

    // Finds the correct book id
    let desiredBook = booksArray.find(x => x._id === this.props.id);
    console.log(this.props.id);

    // Prints the book as objects
    let printBook;
    if (desiredBook) {
      printBook = (
        <div className="book-list">
          <p className="book-item">
            Title: <span>{desiredBook.title}</span>
          </p>
          <p className="book-item">Author: {desiredBook.author}</p>
          <p className="book-item">Price: {desiredBook.price} $</p>
          <p className="book-item">Sellers name: {desiredBook.name}</p>
          <p className="book-item">Sellers email: {desiredBook.email}</p>
        </div>
      );
    }

    return (
      <>
        <div className="container">
          <h2 className="title is-4 list-item">Book Info</h2>
          <ul>{printBook ? printBook : <p>Loading books..</p>}</ul>
        </div>
      </>
    );
  }
}

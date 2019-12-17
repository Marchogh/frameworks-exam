import React, { Component } from 'react';
import { Link } from "@reach/router";

export default class BookList extends Component {

    render() {
        const book = this.props.getBook(this.props.id);
        console.log(book);
        
        let bookList;
        if (book) {
            bookList = book.books.map((b) => (
                <li className="book-list" key={b._id}>
                    <Link to={"/book/" + b._id}>
                        <p>Title: {b.title}</p> 
                        <p>Author: {b.author}</p>
                    </Link>
                </li>
            ))
        }
        
        return (
            <>
                <div className="container">
                    <section className="section">
                        {book ? <h3>You are under category {book.category}</h3> : <p>"loading Category..</p>}
                        {bookList ? <div>{bookList}</div> : <p>"loading books..."</p>}
                    </section>
                </div>
            </>
        )
    };
}


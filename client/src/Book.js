import React, {Component} from 'react';
/* import { Link } from "@reach/router"; */
/* import PostAnswer from "./PostAnswer"; */

export default class Book extends Component {

    render() {
        const book = this.props.getBook(this.props.id);
        console.log(book);
        
        return (
            <>
                <div className="container">
                <section className="section">
                    {book ? <h3>You are under category {book.category}</h3> : <p>"loading books..."</p>}

                       {/*  {book.books.map((b) => (
                            <li key={b._id}>
                                <Link to={"/book/" + b._id}>
                                    <p>{b.title}</p>
                                    <p>{b.author}</p>
                                </Link>
                            </li>
                        ))}  */}
                </section>
                </div>
            </>
        )
    };
}
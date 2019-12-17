import React, { Component } from 'react';

export default class Book extends Component {
    render() {

        const book = this.props.books;
        console.log(book);
        
        return (
            <>
                <div className="container">
                    <h2 className="title is-4">Alt information omkring: </h2>

                    <ul>
                        {book.category}
                        {book.title}
                    </ul>
                </div>
            </>
        )
    };

}


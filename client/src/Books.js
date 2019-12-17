import React, { Component } from 'react';
import { Link } from "@reach/router";


export default class Books extends Component {

    render() {
        if (!this.props.books) return <p>Loading...</p>;

        let cgList = this.props.books.map(elm =>
            <li key={elm._id}><Link className="list-item" to={"/category/" + elm._id}>{elm.books.title}</Link></li>
        );

        return (
            <div className="container">
                <h2 className="title is-4">Category name: </h2>

                <ul className="has-background-white-bis">
                    {cgList}
                </ul>
                
            </div>
        )
    };
}
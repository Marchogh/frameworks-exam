import React, {Component} from 'react';
import { Link } from "@reach/router";


export default class Books extends Component {

    render() {
        if (!this.props.books) return <p>Loading...</p>;

        let categories = this.props.books.map(c =>
            <li className="list-items" key={c._id}><Link className="list-item" to={"/category/" + c._id}>{c.category}</Link></li>
        );
            
        return (
            <div className="container">
                <h2 className="title is-4">List of books for sale by categories</h2>

                <ul>
                    {categories}
                </ul>
            </div>
        )
    };
}
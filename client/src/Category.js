import React, {Component} from 'react';
import { Link } from "@reach/router";
import PostCategory from "./PostCategory";

export default class Books extends Component {

    render() {
        if (!this.props.books) return <p>Loading...</p>;

        let trList = this.props.books.map(elm =>
            <li key={elm._id}><Link className="list-item" to={"/category/" + elm._id}>{elm.category}</Link></li>
        );

        return (
            <div className="container">
                <h2 className="title is-4">Find books by categories</h2>

                <ul className="has-background-white-bis">
                    {trList}
                </ul>
                <div className="container">
                    <PostCategory onPostCategory={this.props.onPostCategory}/>
                </div>
            </div>
        )
    };
}
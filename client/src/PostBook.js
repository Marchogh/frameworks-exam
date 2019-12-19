import React, { Component } from 'react';

export default class PostBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            book: ""
        };
        this.handleInput = this.handleInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleInput(event) {
        event.preventDefault();
        this.props.onPostBook(this.state.book);
        this.setState({ book: "" })
    }

    onChange(event) {
        this.setState({
            book: event.target.value
        });
    }

    render() {
        return (
            <section className="section">
                <div className="container">
                    <h1 className="title is-2 post-book">Post a book for sale</h1>
                    <form>
                        <div className="field">
                            <label className="label" htmlFor="BookInput">Add Book</label>
                            <input className="input" onChange={this.onChange} name="book"
                                value={this.state.book}
                                placeholder="Book"
                                id="BookInput" />
                        </div>
                        <div className="field">
                            <button className="button is-primary" onClick={this.handleInput} type="submit"
                                id="bookButton">Post Book
                    </button>
                        </div>
                    </form>
                </div>
            </section>
        )
    };
}
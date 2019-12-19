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


        let categories = this.props.books.map(c =>
                <option>{c.category}</option>
        );
        
        return (
            <section className="section">
                <div className="container">
                    <h1 className="title is-2 post-book">Post a book for sale</h1>
                    <p>POST Book - Kunne ikke få den til at virke i frontend delen, den virker hvis man sender en POST request via API'en api/books/:id/books</p>
                   
                    <form>
                        <div className="field">
                            <label className="label">Title</label>
                            <input className="input" onChange={this.onChange} name="title"
                                value={this.state.book.title}
                                placeholder="Title"
                                id="TitleInput" />
                        </div>
                        <div className="field">
                            <label className="label">Author</label>
                            <input className="input" onChange={this.onChange} name="author"
                                value={this.state.book.author}
                                placeholder="Author"
                                id="AuthorInput" />
                        </div>
                        <div className="field">
                            <label className="label">Price</label>
                            <input className="input" onChange={this.onChange} name="price"
                                value={this.state.book.price}
                                placeholder="Price"
                                id="PriceInput" />
                        </div>
                        <div className="field">
                            <label className="label">Your name</label>
                            <input className="input" onChange={this.onChange} name="name"
                                value={this.state.book.name}
                                placeholder="Name"
                                id="NameInput" />
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <input className="input" onChange={this.onChange} name="email"
                                value={this.state.book.email}
                                placeholder="Email"
                                id="EmailInput" />
                        </div>
                        <div className="select">
                            <select>
                                <option>Select dropdown</option>
                                {categories}
                            </select>
                            
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
import React, {Component} from 'react';

export default class PostCategory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: ""
        };
        this.handleInput = this.handleInput.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleDeleteInput = this.handleDeleteInput.bind(this);
    }

    handleInput(event) {
        event.preventDefault();
        this.props.onPostCategory(this.state.category);
        this.setState({category: ""})
    }

    onChange(event) {
        this.setState({
            category: event.target.value
        });
    }

    handleDeleteInput(id) {
        this.props.onDeleteCategory(id);
    }

    render() {

        if (!this.props.books) return <p>Loading...</p>;

        let categories = this.props.books.map(c =>
            <>
                <li className="list-items">{c.category} <button onClick={() => this.handleDeleteInput(c._id)}>Delete</button></li>
                
            </>
        );
            
        return (
            <section className="section">
                <div className="container">
            <form>
                <div className="field">
                    <label className="label" htmlFor="CategoryInput">Add category</label>
                    <input className="input" onChange={this.onChange} name="category"
                           value={this.state.category}
                           placeholder="Category"
                           id="CategoryInput"/>
                </div>
                <div className="field">
                    <button className="button is-primary" onClick={this.handleInput} type="submit"
                            id="CategoryButton">Post Category
                    </button>
                </div>
            </form>
            <p>Delete knappen virker ikke i frontend delen - Det virker kun i backend når man laver en POST request til api/books//delte-category</p>
                {categories}
                </div>
            </section>

        )
    };
}
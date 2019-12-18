import React, {Component} from 'react';
import {Link} from "@reach/router";

class UserHeader extends Component {
    
    render() {
        const writeLoginStatus = () => {
            if (this.props.username) {
                return (
                    <>
                        Welcome {this.props.username}.
                        <button className="button is-small" onClick={
                            (event) => this.props.logout(event)}> logout</button>
                        <form>
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Title" />
                                </div>
                            </div>
                            <div className="field">
                                <button className="button is-primary" type="submit">
                                    Add Book
                    </button>
                            </div>
                        </form>

                    </>)
            } else {
                return <Link to="/login" className="btnText">Post a book for sale</Link>
            }
        };

        return (
            <>
            <div className="container is-widescreen">
                <div className="notification">
                    {writeLoginStatus()}
                </div>
            </div>
           
            </>
        );
    }
}

export default UserHeader;

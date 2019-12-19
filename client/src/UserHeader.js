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
                        <div className="container is-widescreen">
                            <Link to="post-category"><p className="notification">Post a category</p></Link>
                        </div>
                    </>)
            } else {
                return <Link to="/login" className="btnText">Admin login</Link>
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

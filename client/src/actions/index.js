import AuthService from "../AuthService";
import { navigate } from "@reach/router"

const API_URL = process.env.REACT_APP_API_URL;
const Auth = new AuthService(`${API_URL}/users/authenticate`);

/******************************************************
  Actions for Notifications
 ******************************************************/
export const showAlert = (title, text, level) => ({
    type: 'SHOW_ALERT',
    title: title,
    text: text,
    level: level
});

export const showAndHideAlert = (title, text, level, delay = 10000) => async function (dispatch) {
    console.log("Delay of " + delay);
    dispatch(showAlert(title, text, level));
    setTimeout(_ => dispatch(hideAlert()), delay);
};

export const hideAlert = (title, text) => ({
    type: 'HIDE_ALERT',
});


/******************************************************
  Actions for User credentials and Login / logout
 ******************************************************/
export const addUserCredentials = (username) => ({
    type: 'ADD_USER_CRED',
    username: username
});

export const removeUserCredentials = (username) => ({
    type: 'REMOVE_USER_CRED'
});

export const login = (username, password) => async function (dispatch) {
    try {
        await Auth.login(username, password);
        dispatch(addUserCredentials(username));
        navigate("/"); // Front page
    } catch(e) {
        dispatch(showAndHideAlert("Login Failed", e.message, "error"));
    }
};

export const logout = _ => async function (dispatch) {
    Auth.logout();
    dispatch(removeUserCredentials());
};


/******************************************************
  Actions for handling books and answers.
 ******************************************************/
export const replaceBooks = books => ({
    type: 'ADD_BOOKS',
    books: books
});

export const loadBooks = _ => async function (dispatch) {
    try {
        const url = `${API_URL}/books`;
        const response = await Auth.fetch(url);
        const data = await response.json();
        dispatch(replaceBooks(data));
    } catch (e) {
        console.error(e);
        dispatch(showAndHideAlert("Error loading books", e.message, "error"));
    }
};

export const postCategory = category => async function(dispatch) {
    if (category === "") return;
    try {
        const newCategory = { category: category };
        const response = await Auth.fetch(`${API_URL}/books`, {
            method: "POST",
            body: JSON.stringify(newCategory)
        });
        if (response.status === 401) {
            dispatch(showAndHideAlert("Login", "You need to login to post Books!", "alert"));
        } else {
            await response.json();
            dispatch(loadBooks());
        }
    } catch (e) {
        dispatch(showAndHideAlert("Send book error", e.message, "error"));
        console.error(e);
    }
};
import React from "react";
import firebase from "firebase";

const provider = new firebase.auth.GoogleAuthProvider();

export class LoginPage extends React.Component {
  login = () => {
    firebase.auth().signInWithPopup(provider);
  };

  render() {
    return (
      <div>
        Login with Google
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

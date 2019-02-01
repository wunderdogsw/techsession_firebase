import React from "react";
import { LoginPage } from "~/components/LoginPage";
import firebase from "firebase";
import { ChatPage } from "~/components/ChatPage";

interface State {
  user?: firebase.User | null;
}

export class MainPage extends React.Component<{}, State> {
  state: State = {};

  unsub?: firebase.Unsubscribe;

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  render() {
    if (this.state.user === undefined) {
      return "Loading";
    }
    if (this.state.user === null) {
      return <LoginPage />;
    }

    return <ChatPage user={this.state.user} />;
  }

  componentWillUnmount() {
    this.unsub && this.unsub();
  }
}

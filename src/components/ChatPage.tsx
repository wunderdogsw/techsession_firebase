import React from "react";
import firebase from "firebase/app";

interface Props {
  user: firebase.User;
}

interface Message {
  key: string;
  user: string;
  contents: string;
}

interface State {
  message: string;
  messages: Message[];
}

export class ChatPage extends React.Component<Props, State> {
  state: State = {
    message: "",
    messages: []
  };

  componentDidMount() {
    firebase
      .database()
      .ref("messages")
      .limitToLast(100)
      .on("child_added", this.addMessage);
  }

  addMessage = (snapshot: firebase.database.DataSnapshot | null) => {
    const message = {
      key: snapshot!.key!,
      user: snapshot!.val().user,
      contents: snapshot!.val().contents
    };
    this.setState(state => ({
      messages: state.messages
        .concat([message])
        .sort((a, b) => a.key.localeCompare(b.key))
    }));
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      message: ev.target.value
    });
  };

  sendMessage = () => {
    firebase
      .database()
      .ref("messages")
      .push({
        user: this.props.user.displayName,
        contents: this.state.message
      });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.messages.map(msg => (
            <li key={msg.key}>
              {msg.user}: {msg.contents}
            </li>
          ))}
        </ul>
        <input
          type="text"
          onChange={this.onChange}
          value={this.state.message}
        />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}

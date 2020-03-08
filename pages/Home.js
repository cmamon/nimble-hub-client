import io from 'socket.io-client'
import React from 'react'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputValue: '',
      socket: io('http://localhost:8080')
    };
  }

  sendMessage = (event) => {
    event.preventDefault(); // prevents page reloading
    let sendingDateTime = new Date();
    let sendingTime = sendingDateTime.toLocaleTimeString('en-GB',
      { hour: "numeric",  minute: "numeric"}
    );

    this.state.socket.emit('message', {
      dateTime : sendingTime,
      content: this.state.inputValue
    });

    this.setState({ inputValue: '' });
    this.updateMessages()
  }

  updateMessages = () => {
    this.state.socket.on('message', (message) => {
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

  updateInputValue = (event) => {
    this.setState({inputValue: event.target.value});
  }

  render() {
    const messages = this.state.messages.map((message, id) =>
      <article className="message is-fullwidth" key={id}>
        <div className="message-body">
          <p className="has-text-weight-medium">{message.content}</p>
          <p className="is-italic is-family-code is-size-7">{message.dateTime}</p>
        </div>
      </article>
    );

    return (
      <div className="content">
        <section>
          <div className="columns is-mobile is-centered">
            <div className="column is-three-fifths is-offset-one-fifth">
              <div>
                <form onSubmit={this.sendMessage}>
                  <div className="field is-grouped">
                    <p className="control is-expanded">
                      <input value={this.state.inputValue} onChange={this.updateInputValue} className="input" type="text" placeholder="Enter message" />
                    </p>
                    <p className="control">
                      <button className="button is-link">Send</button>
                    </p>
                  </div>
                </form>
                <br />
                <div id="messages">
                  {messages}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home
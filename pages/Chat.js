import io from 'socket.io-client'
import React from 'react'

import ChatHeader from '../components/ChatHeader'
import Message from '../components/Message'

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: '',
      socket: io('http://localhost:8080')
    };
  }

  componentDidMount() {
   this.updateMessageList(); 
  }

  sendMessage = (event) => {
    event.preventDefault(); // prevents page reloading
    const sendingDateTime = new Date();
    const sendingTime = sendingDateTime.toLocaleTimeString(
      'en-GB',
      { hour: 'numeric',  minute: 'numeric'}
    );

    const message = {
      origin: 'self',
      sendingTime : sendingTime,
      content: this.state.message
    };

    this.setState({ message: '' });
    this.appendMessage(message);
    // scroll to the bottom of the page
    // window.scrollTo(0, document.querySelector('#message-list').scrollHeight);
    const messageList = document.querySelector('#message-list');
    //messageList.scrollTo(0, messageList.scrollHeight);
    messageList.scrollTop = messageList.scrollHeight - (messageList.clientHeight + 15);

    this.state.socket.emit('message', message);
  }

  appendMessage = (message) => {
    this.setState({ messageList: [...this.state.messageList, message] });
  }

  updateMessageList = () => {
    this.state.socket.on('message', (message) => {
      this.setState({ messageList: [...this.state.messageList, message] });
    });
  }

  updateMessage = (event) => {
    this.setState({ message: event.target.value });
  }

  render() {
    const messageList = this.state.messageList.map((message, id) =>
      <Message {...message} key={id}/>
    );

    return (
      <>
        <div className="content">
          <div id="main">
            <ChatHeader />
            <div id="message-list">
              {messageList}
            </div>
            <div id="message-input">
              <form onSubmit={this.sendMessage}>
                <input className="text-input" type="text" placeholder="Your message" value={this.state.message} onChange={this.updateMessage}></input>
                <button className="button" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            #main {
              display: flex;
              flex-flow: column;
              height: 100%;
              margin: auto;
              width: 50%;
              box-shadow: 2px 0 10px 1px rgba(0, 0, 0, 0.2), -2px 0 10px 1px rgba(0, 0, 0, 0.2);
              background-color: #dee4ea;
              background-image: linear-gradient(147deg, #dee4ea 0%, #f9fcff 74%);
              flex-grow : 1;
            }

            #message-list {
              display: flex;
              flex-flow: column;
              flex: 1 1 auto;
              margin: 10px;
              padding: 10px;
              overflow-y: auto;
            }

            #message-input {
              flex: 0 1;
              text-align: center;
              -webkit-box-shadow: 0 -8px 6px -6px rgba(0, 0, 0, 0.3);
              -moz-box-shadow: 0 -8px 6px -6px rgba(0, 0, 0, 0.3);
              box-shadow: 0 -8px 6px -6px rgba(0, 0, 0, 0.3);
            }

            form {
              padding 15px;
              bottom: 0;
              width: 100%;
            }

            form input {          
              border-radius: 5px;
              border: none; 
              padding: 15px;
              margin-right: 2%;
              width: 70%;
              box-shadow: 1px 0 3px 1px rgba(0, 0, 0, 0.2), -1px 0 3px 1px rgba(0, 0, 0, 0.2);
            }

            form button {
              border: none;
              padding: 15px;
              border-radius: 5px; 
              width: 20%;
              box-shadow: 1px 0 3px 1px rgba(0, 0, 0, 0.2), -1px 0 3px 1px rgba(0, 0, 0, 0.2);
            }
          `}
        </style>
      </>
    );
  }
}

export default Chat
import ContentEditable from 'react-contenteditable';
import io from 'socket.io-client';
import React from 'react';
import sanitizeHtml from 'sanitize-html';

import styles from '../styles/Chat.module.css';

import ChatHeader from '../components/ChatHeader';
import Message from '../components/Message';

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
      message.origin = 'foreign';
      this.setState({ messageList: [...this.state.messageList, message] });
    });
  }

  updateMessage = (event) => {
    this.setState({ message: event.target.value });
  }

  sanitizeConfig = {
    allowedAttributes: { a: ["href"] }
  };

  sanitize = () => {
    this.setState({ message: sanitizeHtml(this.state.message, this.sanitizeConf) });
  };

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
            <div id="chat-footer">
              <div id="message-input-row">
                {/* <div id="message-input" contentEditable onInput={this.updateMessage}></div> */}
                <ContentEditable className="editable" html={this.state.message} onBlur={this.sanitize} onChange={this.updateMessage} />
                {/* <textarea id="message-input" rows="1" placeholder="Your message" value={this.state.message} onChange={this.updateMessage}></textarea> */}
                <button className="button" onClick={this.sendMessage}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Chat

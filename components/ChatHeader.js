import React from 'react'

class ChatHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div id="chat-header">
          <p>Nimble Socket Hub</p>            
        </div>
        <style jsx>
          {`
            #chat-header {
              flex: 0 1 auto;
              text-align: center;
              -webkit-box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.3);
              -moz-box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.3);
              box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.3);
            }
          `}
          </style>
      </>
    );
  }
}

export default ChatHeader
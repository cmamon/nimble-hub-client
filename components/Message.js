import React from 'react'

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="message">
          <p className="content-p">{this.props.content}</p>
          <p className="sending-time-p">{this.props.sendingTime}</p>
        </div>
        <style jsx>
          {`
            .message {
              padding: 0 12px 0 12px;
              margin: 5px 0 5px 0;
              min-width: fit-content;
              // max-width: 60%;
              border-radius: 10px;
              box-shadow: 1px 0 6px 1px rgba(0, 0, 0, 0.6);
              background: lightsalmon;
            }

            .content-p {
              overflow-wrap: break-word;
              margin-top: 8px;
              margin-bottom: 8px;
            }

            .sending-time-p {
              font-size: 10px;
              margin-top: 8px;
              margin-bottom: 8px;
            }
          `}
        </style>
      </>
    );
  }
}

export default Message
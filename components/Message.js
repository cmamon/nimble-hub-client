import React from 'react'

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messageRowClasses = `message-row ${this.props.origin}`
    const messageClasses = `message message-${this.props.origin}`;

    return (
      <>
        <div className={messageRowClasses}>
          <div className={messageClasses}>
            <p className="content-p">{this.props.content}</p>
            <p className="sending-time-p">{this.props.sendingTime}</p>
          </div>
        </div>
        <style jsx>
          {`
            .message-row {
              display: flex;
            }

            .self {
              justify-content: flex-end;
            }

            .foreign {
              justify-content: flex-start;
            }

            .message {
              padding: 0 12px 0 12px;
              margin: 6px 0 6px 0;
              max-width: 60%;
              border-radius: 10px;
              background: lightsalmon;
            }

            .message-self {
              box-shadow: -1px 0 4px 0 rgba(0, 0, 0, 0.6);
            }

            .message-foreign {
              box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.6);
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
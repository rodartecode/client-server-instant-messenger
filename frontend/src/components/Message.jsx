import React from "react";
import styles from '../styles.module.css'

export class Message extends React.Component {
    constructor(){
        super();
        this.messageRef = React.createRef();
    }

    componentDidMount(){
      if (this.messageRef.current) {
        this.messageRef.current.scrollIntoView({
            block: "end",
            behavior: "smooth",
        });
      }
    }
    render() {
        return (
        <div ref={this.messageRef}>
          <div className={this.props.message['data']['username'] == sessionStorage.Username ? styles.conversation_your_username : styles.conversation_username}>
            {this.props.message['data']['username']}
          </div>
          <div className={this.props.message['data']['username'] == sessionStorage.Username ? styles.conversation_your_message : styles.conversation_message}>
            {this.props.message['data']['message']}
          </div>
          <br/>
        </div>
        )
        }
  };

  export default Message;
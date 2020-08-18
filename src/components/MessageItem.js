import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import  { useRef, useEffect } from "react";


export default class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      edited: false,
      text: this.props.text
    }
  }
  handleChange = e => {
    //populate state with form data
    this.setState({
      text: e.target.value
    })
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
}

componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
}
  /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
          this.setState({edited:false});
      }
  }
  render() {
    let { date,
      id,
      currentUser,
      profileImageUrl,
      text,
      username,
      removeMessage,
      updateMessage,
      isCorrectUser } = this.props;

    let theDisplayedText = <p>{text}</p>
    if (this.state.edited && isCorrectUser) {
      theDisplayedText = <p><input type="text" value={this.state.text} name="text" onChange={this.handleChange}></input></p>
    }
    return (
      <div onDoubleClick={() => this.setState({ edited: true })}  ref={this.wrapperRef}>
        <li className="list-group-item">
          <img
            src={profileImageUrl || DefaultProfileImg}
            alt={username}
            height="100"
            width="100"
            className="timeline-image"
          />
          <div className="message-area" >
            <Link to="/">@{username} &nbsp;</Link>
            <span className="text-muted">
              <Moment className="text-muted" format="Do MMM YYYY">
                {date}
              </Moment>
            </span>
            {theDisplayedText}
            {isCorrectUser && (
              <div>
                <a className="btn btn-danger" onClick={removeMessage}>
                  Delete
         </a>
                <button className="btn btn-success" >
                  update
         </button>
              </div>
            )}
          </div>
        </li>
      </div>)
  }

}

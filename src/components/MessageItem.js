import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { updateMessage} from "../store/actions/messages";



class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      edited: false,
      text: this.props.text,
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
  // click outside message item to cancel editing
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ edited: false });
    }
  }
  handleUpdate = event => {
    event.preventDefault();
    let {messageId,current}=this.props
    this.props.updateMessage(current,messageId,this.state.text)
    
  }


  render() {
    let {
      date,
      profileImageUrl,
      text,
      username,
      removeMessage,
      isCorrectUser,userId,match } = this.props;
    //double click on message item to edit the message
    console.log(match.path);
    let theDisplayedText = <p>{text}</p>
    if (this.state.edited && isCorrectUser) {
      theDisplayedText =
        <div>
          <form onSubmit={this.handleUpdate}>
            <input type="text" value={this.state.text} name="text" onChange={this.handleChange} autoComplete="off"/>
            <input className="btn btn-success" type="submit" value="update" />
          </form>
        </div>



    }
    return (
      <div onDoubleClick={() => this.setState({ edited: true })} ref={this.wrapperRef}>
        <li className="list-group-item">
          <img
            src={profileImageUrl || DefaultProfileImg}
            alt={username}
            height="100"
            width="100"
            className="timeline-image"
          />
          <div className="message-area" >
            <Link to={`/profile/${username}`}>@{username} &nbsp;</Link>
            <span className="text-muted">
              <Moment className="text-muted" format="Do MMM YYYY">
                {date}
              </Moment>
            </span>
            {theDisplayedText}
           
            {isCorrectUser && (
              <div >
                <a className="btn btn-danger" onClick={removeMessage}>
                  Delete
                </a>
               
              </div>
            )}
          </div>
        </li>
      </div>)
  }

}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { updateMessage })(MessageItem);

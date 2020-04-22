import React, { Component } from "react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { Redirect } from "react-router";
import "./HomePage.css";
import io from "socket.io-client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { joinRoom, getAllUsers } from "./requests";
const SOCKET_IO_URL = "http://34.222.106.164:8000";


class ChatRoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: {
        name: ''
      },
      token: localStorage.getItem("token") ? localStorage.getItem("token").split(' ')[1] : '',
      message: '',
      messages: [],
      selectedFile: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);

  }

  async getData() {
    this.socket.emit('all-messages', { chatId: this.props.match.params.id });
  }
  componentDidMount() {
    const id = this.props.match.params.id;

    this.socket = io(SOCKET_IO_URL, {
      query: {
        token: this.state.token
      }
    });

    this.socket.on("connect", data => {
      this.socket.emit('join-chat', id);
      this.getData()
    });

    this.socket.on("new-message", data => {
      console.log(data)
      this.setState({ messages: [...this.state.messages, data] })
    });

    this.socket.on("all-messages-response", data => {
      this.setState({ messages: data })
    });
  }y


  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      const data = {
        chat: this.props.match.params.id,
        text: this.state.message,
        file: this.state.selectedFile,
        type: 1
      }
      this.socket.emit('create-message', data);
      this.state.message = '';
      this.state.selectedFile = null
    } catch (error) {
    }
  };
  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  getUserName(user) {
    let name = null;
    if (user.fullName) name = user.fullName;
    else if (user.name) name = user.name;
    else if (user.firstName && user.lastName ) name = `${user.firstName} ${user.lastName}`
    else if (user.email) name = user.email;
    else name = user._id
    return name;
  }

  onChangeHandler(event) {
    this.setState({ selectedFile: event.target.files[0] });
  }
  messages() {
    return this.state.messages.map(message => {
      if (message)
        if (message.type === 1) {
          return <div className="message">
            <p>{this.getUserName(message.user)}</p>
            <p>{message.text}</p>
            <img src={message.file} />
          </div>
        } else {
          return <div className="message">
            <p>{this.getUserName(message.user)}</p>
            <p>{message.text}</p>
          </div>
        }
    })
  }

  render() {
    return (
      <div>
        <h3>Messages:</h3>
        <div>{this.messages()}</div>


        <form onSubmit={this.handleSubmit}>
          <label>
            New message:
              <input type="text" value={this.state.message} onChange={this.handleChange} />
            <input type="file" name="file" onChange={this.onChangeHandler} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ChatRoomPage;
import React, {Component} from "react";
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
const SOCKET_IO_URL = "http://192.168.50.52:3001";
const socket = io(SOCKET_IO_URL);


class ChatRoomPage extends Component {
  constructor(props){
    super(props);
    // const [id] = useState();
    // console.log('id => ', id)
    this.state = {
      chat: {
        name: ''
      },
      messages: []
    }

  }
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log('id => ', id)
  }


  render() {
    return (
      <div>
          {/* <h1 className="App-title">Welcome to React</h1>

          <form onSubmit={this.handleSubmit}>
            <label>
              token:
              <input type="text" value={this.state.token} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <hr />
          <h3>Users:</h3>
          <ul>
            {this.users()}
          </ul>
          <hr />
          <hr />
          <hr />
          <h3>Chats:</h3>
          <ul>
            {this.chats()}
          </ul> */}
      </div>
    );
  }
}

export default ChatRoomPage;
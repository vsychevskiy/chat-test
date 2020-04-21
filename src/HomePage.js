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
import { joinRoom, getAllUsers } from "./requests";
import { Link } from "react-router-dom";
const SOCKET_IO_URL = "http://192.168.50.52:3001";
const socket = io(SOCKET_IO_URL);


class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      token: '',
      chats: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getData(){
    console.log('async getData(){')
    this.socket.emit('all-chats');
    this.socket.emit('all-users');
  }

  componentDidMount(){
    this.socket = io(SOCKET_IO_URL, {
      query: {
        token: localStorage.getItem("token").split(' ')[1]
      }
    });
    this.socket.on("connect", data => {
      console.log('connected')
      this.getData();
    });

    this.socket.on("all-chats-response", data => {
      this.setState({chats: data})
    });

    this.socket.on("all-users-response", data => {
      this.setState({users: data})
    });

    this.socket.on("new-chat", data => {
      console.log('new-chat => ', data)
      this.getData();
    });

    this.socket.on("disconnect", data => {
      console.log('disconnect => ')
    });
  }

  async handleSubmit (evt) {
    evt.preventDefault();
      try {

        console.log('target.value => ', this.state.token)
        localStorage.setItem("token", this.state.token);
      } catch(error ) {
        console.log('error => ', error)
      }
  };

  createChat(user) {
    console.log('createChat => ', user)
    this.socket.emit('create-chat', {user: user._id});
  }

  handleChange(event) {
    this.setState({token: event.target.value});
  }
  users() {
    return this.state.users.map(user => {
      return <div>
        <li>{user.email} <button onClick={() => this.createChat(user)}>Create chat</button></li>
      </div>
    })
  }

  chats() {
    return this.state.chats.map(chat => {
      return <div>
        <li> <Link to={`/chat/${chat._id}`}>{chat.name}</Link></li>
      </div>
    })
  }

  render() {
    return (
      <div>
          <h1 className="App-title">Welcome to React</h1>

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
          </ul>
      </div>
    );
  }
}

export default HomePage;
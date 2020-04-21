import React from "react";
import { Router, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import TopBar from "./TopBar";
import { createBrowserHistory as createHistory } from "history";
import "./App.css";
import ChatRoomPage from "./ChatRoomPage";
const history = createHistory();
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <TopBar />
        <Route path="/" exact component={HomePage} />
        <Route path="/chat/:id" exact component={ChatRoomPage} />
      </Router>
    </div>
  );
}
export default App;
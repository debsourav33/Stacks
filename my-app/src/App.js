import React, { Component } from "react";
import './App.css';
import Counter from './components/counter/Count';
import 'bootstrap/dist/css/bootstrap.css';
import Todo from './components/todo/Todo';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginComponent from "./components/todo/login";
import main from "./js_module/animal";
import HeaderComponent from "./components/todo/Header";
import LogoutComponent from "./components/todo/logout";
import FooterComponent from "./components/todo/Footer";

class App extends Component {
  
  render(){   
    return (
      <div className="App">
        { /*<Todo/>*/ }
        <Router>
          <HeaderComponent/>
          <Routes>
            <Route path="/" element={<Todo/>}/>
            <Route path="/todo" element={<Todo/>}/>
            <Route path="/login" element={<LoginComponent/>}/>
            <Route path="/logout" element={<LogoutComponent/>}/>
            <Route path="/welcome" element={<Todo/>}/>
          </Routes>
          <FooterComponent/>
        </Router>
        
      </div>
    );
  }  
}

export default App;

import React, { Component } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Todo from './components/todo/Todo';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginComponent from "./components/shared/login";
import HeaderComponent from "./components/shared/Header";
import LogoutComponent from "./components/shared/logout";
import FooterComponent from "./components/shared/Footer";
import AuthenticationService from "./components/shared/AuthenticationService";
import AuthenticatedRoute from "./components/shared/AuthenticatedRoute";
import HeapOverFlowService from "./api/heapoverflow/HeapOverFlowService";
import QuestionFeedComponent from "./components/heapoverflow/QuestionFeedComponent";

class App extends Component {
  
  render(){       
    return (
      <div className="App">
        { /*<Todo/>*/ }
        <Router>
          <HeaderComponent/>
          <Routes>
            <Route path="/" element={<AuthenticatedRoute> <Todo/> </AuthenticatedRoute>}/>
            <Route path="/todo" element={<AuthenticatedRoute> <Todo/> </AuthenticatedRoute>}/>
            <Route path="/questions" element={<AuthenticatedRoute> <QuestionFeedComponent/> </AuthenticatedRoute>}/>
            <Route path="/login" element={<LoginComponent/>}/>
            <Route path="/logout" element={<AuthenticatedRoute> <LogoutComponent/> </AuthenticatedRoute>}/>
            <Route path="/welcome" element={<AuthenticatedRoute> <Todo/> </AuthenticatedRoute>}/>
          </Routes>
          <FooterComponent/>
        </Router>
        
      </div>
    );
  }  
}

export default App;

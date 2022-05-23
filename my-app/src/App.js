import React, { Component } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Provider } from "react-redux";

import store from "./js_module/redux/ReduxStore";
import LoginComponent from "./components/shared/login";
import HeaderComponent from "./components/shared/Header";
import LogoutComponent from "./components/shared/logout";
import AuthenticatedRoute from "./components/shared/AuthenticatedRoute";
import QuestionFeedComponent from "./components/heapoverflow/QuestionFeedComponent";
import QuestionPostComponent from "./components/heapoverflow/QuestionPostComponent";
import CommentListClassComponent from "./components/heapoverflow/comment/CommentListComponent";

class App extends Component {
  
  render(){  
    //new Main().run();
    return (
      <Provider store={store}>
      <div className="App">
        <Router>
          <HeaderComponent/>
          <Routes>
            <Route path="/" element={<LoginComponent/>}/>
            <Route path="/questions" element={<AuthenticatedRoute> <QuestionFeedComponent/> </AuthenticatedRoute> }/>
            <Route path="/questions/:qid" element={<AuthenticatedRoute> <CommentListClassComponent/> </AuthenticatedRoute> }/>
            <Route path="/questions/post" element={<AuthenticatedRoute> <QuestionPostComponent/> </AuthenticatedRoute>}/>
            <Route path="/login" element={<LoginComponent/>}/>
            <Route path="/logout" element={<AuthenticatedRoute> <LogoutComponent/> </AuthenticatedRoute>}/>
          </Routes>
          {/*<FooterComponent/>*/}
        </Router>
        
      </div>
      </Provider>
    );
  }  
}

export default App;

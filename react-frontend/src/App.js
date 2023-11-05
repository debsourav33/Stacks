import Login from "./component/Login";
import QuestionFeed from "./component/questions/QuestionsFeed";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Answers from "./component/answers/AnswerList";
import Header from "./header/Header";
import Signup from "./component/Signup";

function App() {

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="" element={<Login/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/questions" element={<QuestionFeed/>}/>
      <Route path="/questions/:qid" element={<Answers/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}


export default App;

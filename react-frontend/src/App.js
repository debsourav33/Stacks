import Login from "./component/Login";
import QuestionFeed from "./component/questions/QuestionsFeed";
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="" element={<Login/>}/>
      <Route path="/questions" element={<QuestionFeed/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}


export default App;

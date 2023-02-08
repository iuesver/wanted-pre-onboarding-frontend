import { Routes, Route } from "react-router-dom";
import { MainPage } from "./components/MainPage";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Todo } from "./components/Todo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;

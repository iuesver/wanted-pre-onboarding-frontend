import React from "react";
import { Routes, Route } from "react-router-dom";
import { SignUp } from "./components/SignUp";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;

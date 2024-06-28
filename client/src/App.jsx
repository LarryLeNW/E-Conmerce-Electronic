import React from "react";
import path from "./utils/path";
import { Login, Public, Home } from "./pages/public";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
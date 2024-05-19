import Home from "./home/Home";

import Login from "./pages/login";

import Signup from "./pages/signup";

import VerifyEmail from "./pages/VerifyEmail";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user/signup" element={<Signup />}></Route>
          <Route path="/user/login" element={<Login />}></Route>
          <Route
            path="/user/forgot-password/verify-email"
            element={<VerifyEmail />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;

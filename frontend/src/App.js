import "./App.css";
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/Auth/login-components/ForgotPassword";
import Login from "./components/Auth/login-components/Login";
import Signin from "./components/Auth/signin-components/Signin";
import ResetPassword from "./components/Auth/login-components/ResetPassword";
import TodosContainer from "./components/Todos/TodosContainer";
import CreateTodo from "./components/Todos/CreateTodo";
import EditTodo from "./components/Todos/EditTodo";
import VerifyLink from "./components/Auth/login-components/VerifyLink";
import About from "./components/About";
import Disclaimer from "./components/policies/Disclaimer";
import TermsOfService from "./components/policies/TermsOfService";
import PrivacyPolicy from "./components/policies/PrivacyPolicy";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          {/* <Route exact path="/api/v1/verifyResetToken" element={<VerifyLink />} /> */}
          <Route exact path="/api/v1/reset/password" element={<ResetPassword />} />
          {/* <Route exact path="/api/v1/reset/password/:resetToken" element={<ResetPassword />} /> */}
          <Route exact path="/signup/verifyMail" element={<Signin currentForm='verifyMail' />} />
          <Route exact path="/signup/verifyOTP" element={<Signin currentForm='verifyOTP' />} />
          <Route exact path="/signup/sendDetails" element={<Signin currentForm='sendDetails' />} />
          <Route exact path="/" element={<TodosContainer />}/>
          <Route exact path="/createTodo" element={<CreateTodo />}/>
          <Route exact path="/about" element={<About />}/>
          <Route exact path="/:id" element={<EditTodo />}/>
          <Route exact path="/disclaimer" element={<Disclaimer />}/>
          <Route exact path="/termsOfService" element={<TermsOfService />}/>
          <Route exact path="/privacyPolicy" element={<PrivacyPolicy />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

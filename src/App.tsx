import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { auth } from "./firebase";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import LogInPage from "./pages/logIn/LogInPage";
import SignUpPage from "./pages/logIn/SignUpPage";
import { createUserWithEmailAndPassword } from "firebase/auth";

const App = () => {
  useEffect(() => {
    createUserWithEmailAndPassword(auth, "test1@gmail.com", "12341234%");
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/logIn" element={<LogInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </>
  );
};

export default App;

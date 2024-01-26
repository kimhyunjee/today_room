import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { auth } from "./firebase";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import LogInPage from "./pages/logIn/LogInPage";
import SignUpPage from "./pages/logIn/SignUpPage";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  useEffect(() => {
    // onAuthStateChanged(auth,(user)=> {
    //   console.log(user)
    // }) // 사용자 인증정보 변경시마다 이벤트 받아오기
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

import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { auth } from "./firebase";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import LogInPage from "./pages/logIn/LogInPage";
import SignUpPage from "./pages/logIn/SignUpPage";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";

const App = () => {
  const [userState, setUserState] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth();
    console.log(auth);

    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      const isAuthenticated = user !== null;
      setUserState(isAuthenticated);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={userState ? <Main /> : <LogInPage />} />
        <Route path="/logIn" element={<LogInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
      </Routes>
    </>
  );
};

export default App;

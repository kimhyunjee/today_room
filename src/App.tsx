import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { auth } from "./firebase";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Main from "./components/main/Main";
import LogInPage from "./pages/logIn/LogInPage";
import SignUpPage from "./pages/logIn/SignUpPage";
import AddProductPage from "./pages/seller/AddProductPage";
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
        <Route path="/addProduct" element={<AddProductPage />} />
      </Routes>
    </>
  );
};

export default App;

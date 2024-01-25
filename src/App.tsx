import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import LogInPage from "./pages/logIn/logInPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/logIn" element={<LogInPage />} />
      </Routes>
    </>
  );
}

export default App;

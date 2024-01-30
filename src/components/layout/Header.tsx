import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StoolImg from "../../assets/images/stool.png";
import Logo from "../../assets/images/simpleLogo.jpg";

const Header = () => {
  return (
    <>
      <header className="bg-green w-full h-16 sticky top-0 ">
        <div className="w-11/12 max-w-screen-lg h-full flex items-center justify-between mx-auto">
          <div className="w-16">
            <img src={Logo} alt="logo" />
          </div>

          <p>Today Room</p>
          <nav className="navigation">
            <ul className="flex list-none ml-7">
              <li>메뉴1</li>
              <li>메뉴2</li>
              <li>메뉴3</li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;

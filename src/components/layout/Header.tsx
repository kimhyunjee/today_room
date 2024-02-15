import { Link } from "react-router-dom";
import StoolImg from "../../assets/images/stool.png";
import Logo from "../../assets/images/simpleLogo.jpg";
import { FaSearch, FaCartPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

const Header = () => {
  return (
    <>
      <header className=" w-full h-16 sticky top-0 ">
        <div className="w-11/12 max-w-screen-lg h-full flex items-center justify-between mx-auto">
          <div className="w-16">
            <img src={Logo} alt="logo" />
          </div>

          <p>Today Room</p>
          <nav className="navigation">
            <ul className="flex list-none ml-7">
              <li className="mx-5">
                <FaSearch />
              </li>
              <li>
                <FaCartPlus />
              </li>
              <li className="mx-5">
                <FaUser />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;

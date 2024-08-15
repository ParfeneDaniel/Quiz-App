import { Link } from "react-router-dom";
import icon from "../assets/user-icon.png";

const Header = () => {
  return (
    <div id="header">
      <button>Sign out</button>
      <Link to="/profile">
        <img className="icon" src={icon} />
      </Link>
    </div>
  );
};

export default Header;
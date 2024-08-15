import { Link } from "react-router-dom";
import icon from "../assets/user-icon.png";
import useSignOut from "../hooks/useSignOut";

const Header = () => {
  const logout = useSignOut();

  const handleSignOut = () => {
    logout();
  };

  return (
    <div id="header">
      <button onClick={handleSignOut}>Sign out</button>
      <Link to="/profile">
        <img className="icon" src={icon} />
      </Link>
    </div>
  );
};

export default Header;

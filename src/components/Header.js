import { FaQrcode, FaUserAlt, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ title }) => {
  return (
    <header className="Header">
      <h2>Alibi</h2>
      <h2>{title}</h2>
      <div className="icons">
        <Link to="/qr">
          <FaQrcode />
        </Link>
        <FaUserAlt />
        <Link to="/home">
          <FaHome />
        </Link>
      </div>
    </header>
  );
};

export default Header;

import Logo from "../../assets/logo.jpg";
import "./Header.css";

export default function Header() {
  return (
    <div className="Header container my-3">
      <img className="col-6 img-fluid" src={Logo} alt="" />
    </div>
  );
}

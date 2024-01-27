import { ReactComponent as LogoDark } from "../assets/images/logos/Layer_1.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="d-flex text-decoration-none align-items-center">
      <LogoDark />
      <h2 className="m-2 text-secondary">EMC<sup>2</sup></h2>
    </Link>
  );
};

export default Logo;

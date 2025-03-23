import { Link } from "react-router";
import logoItAcademy from "../assets/svg/LogoItAcademy.svg";

const ITAcademyLogo = () => {
  return (
    <Link to="/">
      <img src={logoItAcademy} alt="logo" width={"116px"} height={29} />
    </Link>
  );
}

export default ITAcademyLogo;
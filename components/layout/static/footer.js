import Link from "next/link";

import ImageComponent from "../../image";
import { getPath } from "../../../config/urls";
import Logo from "../../../public/images/logo.svg";

const homePath = getPath("homePath").href;

const Footer = () => (
  <footer>
    <div className="container">
      <div className="footer-inner">
        <ImageComponent alt="logo" src={Logo} />
        <div className="footer-details">
          <div className="footer-detials-item">
            <Link className="footer-link" href={homePath}>
              Privacy policy
            </Link>
          </div>
          <div className="footer-detials-item">
            <Link className="footer-link" href={homePath}>
              Terms and condition
            </Link>
          </div>
          <div className="footer-detials-item">
            <p>Copyrights ©2023 Sheffield Hallam University.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

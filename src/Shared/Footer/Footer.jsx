import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaReddit,
  FaTwitter,
} from "react-icons/fa";
const Footer = () => {
  return (
    <div className="mt-6 overflow-hidden lg:mt-16 md:mt-8 bg-base-200 ">
      <footer className="footer max-w-[1450px] mx-auto p-10  text-base-content">
        <nav className="flex h-full items-center">
          <img className="h-[64px]" src={logo} alt="" />
          <h3 className="text-3xl text-whi font-bold">
            Voyage
            <br />
            <span className="text-red-400">Volunteer</span>
          </h3>
        </nav>
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <Link to={"/"} className="link link-hover">
            Home
          </Link>
          <Link to={"/need_volunteer"} className="link link-hover">
            Need Volunteer
          </Link>
          <Link to={"/add-volunteer-post"} className="link link-hover">
            Add Volunteer Post
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <Link to={"/contact"} className="link link-hover">
            Contact
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <h6 className="footer-title">Newsletter</h6>
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="join">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered join-item"
              />
              <button className="btn btn-primary join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </footer>
      <div className="w-full text-3xl flex-wrap flex justify-center gap-6">
        <FaFacebook />
        <FaTwitter />
        <FaInstagram />
        <FaGithub />
        <FaReddit />
      </div>
      <div className="flex justify-center pb-8 mt-8">
        <h3>&copy; 2024 Voyage Volunteer. All rights reserved.</h3>
      </div>
    </div>
  );
};

export default Footer;

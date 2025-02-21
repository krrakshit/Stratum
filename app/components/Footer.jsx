import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-bold flex justify-center items-center gap-2">
          <span className="w-6 h-6 bg-blue-500 rounded-full"></span> STRATUM
        </h2>
        <nav className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-gray-400">Features</a>
          <a href="#" className="hover:text-gray-400">Resources</a>
        </nav>
        <div className="flex justify-center space-x-4 mt-6">
          <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
          <a href="#" className="text-gray-400 hover:text-white"><FaGithub /></a>
        </div>
        <p className="mt-6 text-gray-500">&copy; Copyright 2025, All Rights Reserved by STRATUM</p>
      </div>
    </footer>
  );
};

export default Footer;

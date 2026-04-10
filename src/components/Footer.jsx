import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { name: "Instagram", url: "https://instagram.com/uwi.dmc" },
    { name: "Sign Up", url: "https://forms.gle/29ztVhgrcbVVGQSg7" },
    { name: "WhatsApp", url: "https://chat.whatsapp.com/IzD0D1VC0pGG8YFCtd6FIr" },
    { name: "Linktree", url: "https://linktr.ee/uwidmc" },
    { name: "UWI Central Hub", url: "https://uch.web.app" },
    { name: "Suggestion Form", url: "https://forms.gle/qNBXQkbcm1DqQff26" },
    { name: "Email", url: "mailto:uwidigitalmediaclub@gmail.com" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto text-center">
        <h5 className="text-xl font-semibold mb-4">Connect with Us</h5>
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition"
            >
              {link.name}
            </a>
          ))}
          <Link to="/vote" className="hover:text-pink-400 transition">
            Voting Page
          </Link>
        </div>
        <small className="block text-gray-400">
          &copy; 2025 Digital Media Club. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
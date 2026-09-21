import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
  FiTwitter,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-black">
              NEX<span className="text-primary">CART</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-content/70">
              Everything you need, one smart cart. Discover quality products,
              great deals and a better way to shop online.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="btn btn-circle btn-sm bg-neutral-content/10 hover:bg-primary hover:text-primary-content"
                aria-label="Facebook"
              >
                <FiFacebook size={16} />
              </a>

              <a
                href="#"
                className="btn btn-circle btn-sm bg-neutral-content/10 hover:bg-primary hover:text-primary-content"
                aria-label="Instagram"
              >
                <FiInstagram size={16} />
              </a>

              <a
                href="#"
                className="btn btn-circle btn-sm bg-neutral-content/10 hover:bg-primary hover:text-primary-content"
                aria-label="Twitter"
              >
                <FiTwitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>

            <div className="flex flex-col gap-3 text-sm text-neutral-content/70">
              <Link to="/" className="transition hover:text-primary">
                Home
              </Link>

              <Link to="/products" className="transition hover:text-primary">
                Shop
              </Link>

              <Link to="/about" className="transition hover:text-primary">
                About Us
              </Link>

              <Link to="/contact" className="transition hover:text-primary">
                Contact
              </Link>

              <Link to="/faq" className="transition hover:text-primary">
                FAQ
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Customer Service</h3>

            <div className="flex flex-col gap-3 text-sm text-neutral-content/70">
              <Link to="/account" className="transition hover:text-primary">
                My Account
              </Link>

              <Link to="/orders" className="transition hover:text-primary">
                My Orders
              </Link>

              <Link to="/wishlist" className="transition hover:text-primary">
                Wishlist
              </Link>

              <Link to="/cart" className="transition hover:text-primary">
                Shopping Cart
              </Link>

              <Link to="/contact" className="transition hover:text-primary">
                Help Center
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Get In Touch</h3>

            <div className="space-y-4 text-sm text-neutral-content/70">
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 shrink-0 text-primary" />
                <span>Bangladesh</span>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="shrink-0 text-primary" />
                <span>+880 1XXX-XXXXXX</span>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="shrink-0 text-primary" />
                <span>support@nexcart.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-neutral-content/10 pt-6 text-center text-sm text-neutral-content/50">
          © 2026 NEXCART. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
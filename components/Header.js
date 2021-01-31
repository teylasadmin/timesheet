// components/Header.js
import Link from "next/link";
import Head from 'next/head'
//import "./Header.scss";

const Header = props => (
      <header>
            <nav>
              <Link exact activeClassName="active" href="/">
                Home
              </Link>
              <Link activeClassName="active" href="/users">
                Users
              </Link>
              <Link activeClassName="active" href="/contact">
                Contact
              </Link>
            </nav>
      </header>
);

export default Header;
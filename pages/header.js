import React from "react";
import Head from 'next/head'
import { NavLink } from "react-router-dom";

function Header() {
  return (
  <>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
              <nav>
                <NavLink exact activeClassName="active" to="/">
                  Home
                </NavLink>
                <NavLink activeClassName="active" to="/users">
                  Users
                </NavLink>
                <NavLink activeClassName="active" to="/contact">
                  Contact
                </NavLink>
              </nav>
        </header>
    </>
  );
}
export default Header;
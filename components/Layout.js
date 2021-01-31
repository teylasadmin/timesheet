import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";

//import "./Layout.scss";
//import "./index.scss";

import navButtons from "../config/buttons";

const Layout = props => {

  return (
    <div className="Layout">
      <Head>
        <title>Timesheet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>

      <Header/>
      <div className="Content">{props.children}</div>
      <NavBar navButtons={navButtons} />
     <Footer/>
    </div>
  );
};

export default Layout;
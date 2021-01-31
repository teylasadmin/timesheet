import React from 'react';
import ReactDOM from 'react-dom';
import App from './_app';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BasicTable from './BasicTable'
import Link from "next/link";

import Layout from "../components/Layout";

const Index = () => (
  <Layout>
    <br />
{/*    <Link href="/explore">
      <a> Welcome to WHATABYTE! Start Exploring Now</a>
    </Link>*/}

    <BasicTable/>
  </Layout>
);

export default Index;
{/*

function HomePage() {
  return <div>Welcome to Next.js!</div>
}

export default HomePage


const routing = (
  <Router>
    <div>
      <Header />
      <hr />
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));



export default function Home({ isConnected }) {
  return (
    <div className="container">
< Header/>


        <BasicTable/>


      <Footer/>

    </div>
  )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()

  const isConnected = await client.isConnected()

  return {
    props: { isConnected },
  }
}
*/}

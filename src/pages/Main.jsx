import React from "react";
import "../styles/style.css";
import LatestItems from "../components/LatestItems";
import LargestCollections from '../components/LargestCollections'
import { FormattedMessage } from "react-intl";

const Main = () => {
  

  return (
    <div>
      <h1 className="title" style={{marginTop:"40px",marginBottom:"20px"}}><FormattedMessage id="main.title.1" /></h1>
      <LargestCollections />
      <h1 className="title" style={{marginTop:"40px",marginBottom:"20px"}}><FormattedMessage id="main.title.2" /></h1>
      <LatestItems />
    </div>
  );
};

export default Main;

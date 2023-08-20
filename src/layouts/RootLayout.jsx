import React from "react";
import { Outlet } from "react-router-dom";
import "@picocss/pico/css/pico.css";
import "../styles/root.css";

const RootLayout = () => {
  return (
    <div id="layout" style={{ width: "100%" }}>
      <header id="header">
        <div className="banner">
          <div className="title">Creatorverse</div>
          <div className="buttonGroup">
            <div>View All Creators</div>
            <div>Add A Creator</div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div id="footer">
          <div>Saoirse Siobhan Ebert</div>
          &copy;2023
          <div>CodePath Prework WEB103</div>
          <div>
            <a href="https://www.freepik.com/free-ai-image/futuristic-office-illuminated-by-blue-lighting-equipment-night-generated-by-ai_41667902.htm#fromView=search&term=creator+universe+stream+channel&page=1&position=6">
              Image By vecstock
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;

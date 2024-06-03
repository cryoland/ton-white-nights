import { FC, useEffect } from "react";
import "./style.css";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Header, Body, Footer } from "./Base";
import { BrowserRouter } from "react-router-dom";
import { sendInitData } from "./ApiClient";

export const App: FC = () => {
  useEffect(() => {
  sendInitData()
    .then(_ => {})
    .catch(err => console.error(err));
    return () => {};
  }, []);

  return (
    <div className="h-full flex flex-column justify-content-between" style={{minHeight: 'inherit'}}>
      <BrowserRouter>
        <div>
          <Header />
          <div className="my-4">
            <Body />
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

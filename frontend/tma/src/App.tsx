import { FC, useEffect, useState } from "react";
import { Nullable } from "primereact/ts-helpers";
import WebApp from "@twa-dev/sdk";
import "./style.css";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Header, Body, Footer } from "./Base";
import { BrowserRouter } from "react-router-dom";
import { retrieveLaunchParams } from '@tma.js/sdk';

const sendInitData = async () => {
  try {
  const params = retrieveLaunchParams();
    await fetch(`https://${import.meta.env.VITE_API_DOMAIN}/user`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify(params)
    });
  } catch (err) { 
    WebApp.showAlert(JSON.stringify(err));
  }
}

export const App: FC = () => {
  const [value, setValue] = useState<Nullable<number | null>>(0);

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

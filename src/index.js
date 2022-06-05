import "bootstrap/dist/css/bootstrap.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker, { unregister } from "./registerServiceWorker";
import "./localization/i18n";
import { MyLoadingIndicator } from "./components/my-loading-indicator/MyLoadingIndicator";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Suspense fallback="...is loading">
    <BrowserRouter basename={baseUrl}>
      <App />
      <MyLoadingIndicator />
    </BrowserRouter>
  </Suspense>,
  rootElement
);

unregister();

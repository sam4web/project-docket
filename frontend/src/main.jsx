import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.jsx";
import "@/styles/main.scss";
import { Provider } from "react-redux";
import { store } from "@/app/store.js";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";


if (import.meta.env.VITE_NODE_ENV === "production")
  disableReactDevTools();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
